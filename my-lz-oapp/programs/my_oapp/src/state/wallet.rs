use crate::*;

#[account]
pub struct Wallet {
    pub wallet_id: String,
    pub owners: Pubkey,
    pub master_chain: u32,
    pub is_paused: bool,
    pub nonce: u64,
    pub other_chain_wallets: Vec<OtherChainWallets>,
    pub created_at: i64,
    pub updated_at: i64,
}

#[account]
pub struct OtherChainWallets{
    pub wallet_id: String,
    pub chain_endpoint: Pubkey,
    pub chain_id: u32,
    pub created_at: i64,
    pub updated_at: i64,
}

impl OtherChainWallets {
    pub fn space() -> usize {
        8 + // discriminator
        4 + Wallet::MAX_WALLET_ID_LENGTH + // wallet_id
        32 + // chain_endpoint (Pubkey)
        4 + // chain_id
        8 + // created_at
        8 // updated_at
    }    
}
impl Wallet {
    pub const MAX_WALLET_ID_LENGTH: usize = 32;
    pub const MAX_OWNERS: usize = 50;
    pub const MAX_OTHER_CHAIN_WALLETS: usize = 20;

    pub fn space() -> usize {
        8 + // discriminator
        4 + Self::MAX_WALLET_ID_LENGTH + // wallet_id
        32 + // owners (Pubkey)
        4 + // master_chain
        1 + // is_paused
        8 + // nonce
        8 + // created_at
        8 // updated_at
    }

    pub fn is_owner(&self, pubkey: &Pubkey) -> bool {
        self.owners == *pubkey
    }

    pub fn initialize(
        &mut self,
        wallet_id: String,
        owners: Pubkey,
    ) -> Result<()> {
        self.wallet_id = wallet_id;
        self.owners = owners;
        self.is_paused = false;
        self.nonce = 0;
        self.created_at = Clock::get()?.unix_timestamp;
        self.updated_at = self.created_at;

        Ok(())
    }
}

