import { AnchorProvider, Program, Idl } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '../idl/XoloCoin.json';

const programId = new PublicKey('138h1Ad67ppzWK6Q6V8MdcpfJyF6WB9FBJd217p8NMD');

export const getProgram = (wallet: any): Program => {
    const connection = new Connection('https://api.devnet.solana.com');
    const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: 'processed',
    });

    return new Program(idl as Idl, programId, provider);
};






