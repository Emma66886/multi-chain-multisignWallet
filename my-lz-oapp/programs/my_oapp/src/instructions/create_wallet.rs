use anchor_lang::prelude::*;
use crate::{
    constants::WALLET_SEED, errors::MyOAppError, msg_codec, state::{wallet::Wallet, PeerConfig, Store}, PEER_SEED, STORE_SEED
};
use oapp::endpoint::{instructions::{QuoteParams, SendParams}, state::EndpointSettings, ENDPOINT_SEED, ID as ENDPOINT_ID};

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct CreateWalletParams {
    pub dst_eid: u32,
    pub receiver: [u8; 32],
    pub message: String,
    pub options: Vec<u8>,
    pub pay_in_lz_token: bool,
}

pub enum MessageType{
    CreateWallet,
    SendTokens,
    SendNative,
    ExecuteTransaction
}

#[derive(Accounts)]
#[instruction(params: CreateWalletParams)]
pub struct CreateNewWallet<'info> {
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


impl <'info> CreateNewWallet<'info> {
    pub fn apply(ctx: &mut Context<CreateNewWallet>, params: &CreateWalletParams) -> Result<()> {
        let is_user_initialized = ctx.accounts.wallet.owners != Pubkey::default();
        if is_user_initialized {
            if ctx.accounts.wallet.is_paused {
                return Err(MyOAppError::WalletPaused.into()); // Wallet is paused
            }
            if !ctx.accounts.wallet.is_owner(&ctx.accounts.payer.key()) {
                return Err(MyOAppError::PayerNotOwner.into()); // Payer is not an owner of the wallet
            }
        }
        // Encode the payload for quoting
        let prepare_message = (MessageType::CreateWallet as u8).to_string() + &ctx.accounts.wallet.key().to_string();
        let message = msg_codec::encode(&prepare_message);

        // Ask the Endpoint how much a send would cost
        let create_wallet_param = QuoteParams {
            sender: ctx.accounts.store.key(),
            dst_eid: params.dst_eid,
            receiver: params.receiver,
            message:message.clone(),
            options: ctx.accounts.peer.enforced_options.combine_options(&None::<Vec<u8>>,&params.options)?,
            pay_in_lz_token: params.pay_in_lz_token,
        };
        
        let msg_fee = oapp::endpoint_cpi::quote(ENDPOINT_ID, ctx.remaining_accounts, create_wallet_param)?;
        let seeds: &[&[u8]] = &[STORE_SEED, &[ctx.accounts.store.bump]];
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