use anchor_lang::prelude::*;
use crate::{
    constants::WALLET_SEED, msg_codec, state::{wallet::CreateWallet, PeerConfig, Store}, QuoteSendParams, PEER_SEED, STORE_SEED
};
use oapp::endpoint::{instructions::RegisterOAppParams, state::EndpointSettings, ENDPOINT_SEED, ID as ENDPOINT_ID};

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct CreateWalletParams {
    pub dst_eid: u32,
    pub receiver: [u8; 32],
    pub message: String,
    pub options: Vec<u8>,
    pub pay_in_lz_token: bool,
}


#[derive(Accounts)]
#[instruction(params: CreateWalletParams)]
pub struct CreateNewWallet<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(
        init,
        payer = payer,
        space = CreateWallet::space(),
        seeds = [WALLET_SEED, payer.key().as_ref()],
        bump
    )]
    pub wallet: Account<'info, CreateWallet>,
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
        // Encode the payload for quoting
        let message = msg_codec::encode(&params.message);

        // Ask the Endpoint how much a send would cost
        let quote_params = QuoteSendParams {
            dst_eid: params.dst_eid,
            receiver: params.receiver,
            message,
            options: ctx.accounts.peer.enforced_options.combine_options(&None::<Vec<u8>>,&params.options)?,
            pay_in_lz_token: params.pay_in_lz_token,
        };
        
        oapp::endpoint_cpi::quote(ENDPOINT_ID, ctx.remaining_accounts, quote_params)?;

        // Initialize the wallet with the provided parameters
        ctx.accounts.wallet.initialize(
            ctx.accounts.payer.key(),
            params.dst_eid,
            params.receiver,
            params.message.clone(),
            params.options.clone(),
            params.pay_in_lz_token,
        )?;

        Ok(())
    }
}