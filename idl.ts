import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";

async function main(){
    const connection = new Connection(clusterApiUrl('devnet'))
    const keypair = Keypair.generate()
    const wallet = new anchor.Wallet(keypair)
    const provider = new anchor.AnchorProvider(connection, wallet, {})
    const candyMachineV2Program = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    const idl = await anchor.Program.fetchIdl(candyMachineV2Program, provider);
    console.log(idl)
    // if (idl) {
    //     const program = new anchor.Program(idl, candyMachineV2Program, provider);
    //     const accounts = await program.account.candyMachine.fetch('9tQLFyLeaUwQ1PN2YDiFztZDxu4KT6px8CBYEapkshAD')
    //     console.log(idl)
    // }
}

main();