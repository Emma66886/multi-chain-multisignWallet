use anchor_lang::prelude::error_code;

use crate::state::wallet::Wallet;

#[error_code]
pub enum MyOAppError {
    InvalidMessageType,
    WalletPaused,
    PayerNotOwner,
    WalletNotInitialized,
    UseWalletInitializationInstruction,
}
