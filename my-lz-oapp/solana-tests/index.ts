import {Program} from "@coral-xyz/anchor";
import {IDL,MyOapp} from "../target/types/my_oapp"
import {PublicKey, Transaction,Connection, clusterApiUrl, Keypair, SystemProgram } from "@solana/web3.js";
import { EndpointId } from '@layerzerolabs/lz-definitions'
import * as accounts from '../lib/client/generated/my_oapp/accounts'
// import { PublicKey } from '@metaplex-foundation/umi'

import { Options } from '@layerzerolabs/lz-v2-utilities';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi'
import {
    mplToolbox
} from '@metaplex-foundation/mpl-toolbox'
import {MyOAppPDA} from '../lib/client/pda'
// import {
    // EndpointProgram
// } from '@layerzerolabs/lz-solana-sdk-v2/umi'
const programID = new PublicKey("G3CAYKc3b2WDshEqtGGArr8JEaL5wu3zQzWwEtyPyNUW");
const program = new Program(IDL as MyOapp,"G3CAYKc3b2WDshEqtGGArr8JEaL5wu3zQzWwEtyPyNUW")
const conn = new Connection(clusterApiUrl("devnet"),"confirmed");
import  bs58  from "bs58";
const sendCreateWalletTx = async()=>{
    try {
        const umi = createUmi(conn.rpcEndpoint).use(mplToolbox())
        const appClass = new MyOAppPDA(publicKey(programID));
        const wallet = new Keypair();
        await conn.requestAirdrop(wallet.publicKey, 5e9); // Airdrop 1 SOL for testing
        console.log({
            publicKey: wallet.publicKey.toBase58(),
            secretKey: bs58.encode(wallet.secretKey)
        })
        const [peer] = appClass.peer(EndpointId.OPTSEP_V2_TESTNET);
        const receiverInfo = await accounts.fetchPeerConfig({ rpc:umi.rpc }, peer, { commitment:"confirmed" })
        // const endPoint = new EndpointProgram.Endpoint(EndpointProgram.ENDPOINT_PROGRAM_ID)
        const [endpoint] = PublicKey.findProgramAddressSync([Buffer.from("Endpoint")],new PublicKey("76y77prsiCMvXMjuoZ5VRrhG5qYBrUMYTE5WgHqgjEn6"))
        const [store] = PublicKey.findProgramAddressSync(
            [Buffer.from("Store")],programID)
        const [solonchainWallet] = PublicKey.findProgramAddressSync(
            [Buffer.from("WALLET_SEED"),wallet.publicKey.toBuffer()],programID);

        const [peerPubkey] = PublicKey.findProgramAddressSync(
            [Buffer.from("Peer"),store.toBuffer()],programID) 
            const tx = await program.methods.createWallet({
            dstEid:EndpointId.OPTSEP_V2_TESTNET,
            message:"Creating new wallet!",
            options:Options.newOptions().toBytes() as any,
            payInLzToken: false,
            receiver:receiverInfo.peerAddress as any,
        }).accounts({
            endpoint,
            payer:wallet.publicKey,
            peer: peerPubkey,
            store:store,
            wallet:solonchainWallet,
            systemProgram:SystemProgram.programId
        }).signers([wallet]).rpc();
        console.log("Transaction signature:", tx);
    } catch (error) {
        console.error("Error sending create wallet transaction:", error);
    }
}

sendCreateWalletTx()