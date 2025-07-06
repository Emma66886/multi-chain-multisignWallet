
use oapp::endpoint::ENDPOINT_SEED;

use crate::{constants::WALLET_SEED, errors::MyOAppError, state::wallet::Wallet, *};
use oapp::endpoint::{instructions::{QuoteParams, SendParams}, state::EndpointSettings, ID as ENDPOINT_ID};

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct SendTransactionParams {
    pub dst_eid: u32,
    pub receiver: [u8; 32],
    pub options: Vec<u8>,
    pub pay_in_lz_token: bool,
    pub message_type: u8, // 0: CreateWallet, 1: SendTokens, 2: SendNative, 3: ExecuteTransaction
    pub destination_wallet: String, // Destination address or identifier
    pub amount: u64, // Amount to send, can be any amount in the destination currency, either token or native
    pub token_address: Option<Pubkey>, // Optional token address for token transfers
    pub transaction_data: Option<String>, // Optional transaction data for execute transaction
}
#[derive(Accounts)]
#[instruction(params: SendTransactionParams)]
pub struct SendTransaction<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init_if_needed,
        payer = payer,
        space = Wallet::space(),
        seeds = [WALLET_SEED, payer.key().as_ref()],
        bump
    )]
    pub wallet: Account<'info, Wallet>,
    #[account(seeds = [STORE_SEED], bump = store.bump)]
    pub store: Account<'info, Store>,
    #[account(
    seeds = [
        PEER_SEED,
        store.key().as_ref(),
        &params.dst_eid.to_be_bytes()
    ],
    bump = peer.bump
    )]
    pub peer: Account<'info, PeerConfig>,
        #[account(seeds = [ENDPOINT_SEED], bump = endpoint.bump, seeds::program = ENDPOINT_ID)]
    pub endpoint: Account<'info, EndpointSettings>,
    pub system_program: Program<'info, System>,
}

impl <'info> SendTransaction <'info>{
    pub fn apply(ctx:&mut Context<SendTransaction>, params: &SendTransactionParams) -> Result<()> {
        let is_user_initialized = ctx.accounts.wallet.owners != Pubkey::default();
        if !is_user_initialized {
           return Err(MyOAppError::WalletNotInitialized.into())
        }
        if ctx.accounts.wallet.is_paused {
            return Err(MyOAppError::WalletPaused.into()); // Wallet is paused
        }
        if params.message_type == MessageType::CreateWallet as u8 {
            return Err(MyOAppError::UseWalletInitializationInstruction.into()); // CreateWallet is not a valid message type for this instruction
        }
        if !ctx.accounts.wallet.is_owner(&ctx.accounts.payer.key()) {
            return Err(MyOAppError::PayerNotOwner.into()); // Payer is not an owner of the wallet
        }
        if params.message_type > 3 {
            return Err(MyOAppError::InvalidMessageType.into()); // Invalid message type
        }

        let seeds: &[&[u8]] = &[STORE_SEED, &[ctx.accounts.store.bump]];
        let prepared_message = if params.message_type == MessageType::SendNative as u8  {
            params.message_type.to_string() + params.destination_wallet.as_str() + &params.amount.to_string()
        } else if params.message_type == MessageType::SendTokens as u8 {
            params.message_type.to_string() + params.destination_wallet.as_str() + &params.amount.to_string() + &params.token_address.map_or("".to_string(), |addr| addr.to_string())
        } else {
            params.message_type.to_string() + params.destination_wallet.as_str() + &params.transaction_data.as_ref().map_or("".to_string(), |data| data.clone())
        };
        let message = msg_codec::encode(&prepared_message);
        let quote_params = QuoteParams {
            sender: ctx.accounts.store.key(),
            dst_eid: params.dst_eid,
            receiver: params.receiver,
            message: message.clone(),
            options: ctx.accounts.peer.enforced_options.combine_options(&None::<Vec<u8>>,&params.options)?,
            pay_in_lz_token: params.pay_in_lz_token,
        };
        let msg_fee = oapp::endpoint_cpi::quote(ENDPOINT_ID, ctx.remaining_accounts, quote_params)?;
         let send_params = SendParams {
            dst_eid: params.dst_eid,
            receiver: ctx.accounts.peer.peer_address,
            message,
            options: ctx
                .accounts
                .peer
                .enforced_options
                .combine_options( &None::<Vec<u8>>, &params.options)?,
            native_fee: msg_fee.native_fee,
            lz_token_fee: msg_fee.lz_token_fee,
        };

        oapp::endpoint_cpi::send(ENDPOINT_ID, ctx.accounts.store.key(), ctx.remaining_accounts, seeds, send_params)?;

        if !is_user_initialized {
            // Initialize the wallet if it was not initialized before
            ctx.accounts.wallet.initialize(
                ctx.accounts.payer.key().to_string(),
                ctx.accounts.payer.key(),
            )?;
        } else {
            // Increment the nonce for the existing wallet
            ctx.accounts.wallet.nonce += 1;
        }

        Ok(())
    }

}