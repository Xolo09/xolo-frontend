import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const payerKeypair = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync(process.env.PAYER_KEYPAIR!, 'utf-8')))
);

const mint = new PublicKey(process.env.TOKEN_MINT!);

// Replace this array with your real recipient addresses
const recipients: string[] = [
    '7uBqxUazvD1HQcR4JMQ3VZT6mXQ7i7ZQjQoAVq2WHN8v',
    'GkEGKzQQ1Lgb9uQoQrCKbw4Lh9YTRtu58p3LTiq3FPr7',
    '6HgejQNC5qNhymA5UzBiDd3oXZrwRoR4ZJZMLN2GmAsW'
];

async function airdrop() {
    for (const address of recipients) {
        try {
            const recipient = new PublicKey(address);
            const payerTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payerKeypair, mint, payerKeypair.publicKey);
            const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                payerKeypair,       // payer
                mint,
                recipient,          // owner of the token account
                true                // allowOwnerOffCurve (safe to include)
            );


            const signature = await transfer(
                connection,
                payerKeypair,
                payerTokenAccount.address,
                recipientTokenAccount.address,
                payerKeypair,
                1_000_000_000 // amount of tokens to send (adjust decimals as needed)
            );

            console.log(`✅ Sent tokens to ${address}. Signature: ${signature}`);
        } catch (err) {
            console.error(`❌ Failed to send to ${address}`, err);
        }
    }
}

airdrop();
