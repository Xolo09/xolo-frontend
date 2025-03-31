import { useState } from "react";
import { BN } from "@coral-xyz/anchor";
import { getProgram } from "../utils/getProgram";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const MINT_ADDRESS = new PublicKey("138h1Ad67ppzWK6Q6V8MdcpfJyF6WB9FBJd217p8NMD");

export function BurnButton() {
    const [amount, setAmount] = useState("0");
    const [status, setStatus] = useState("");
    const { connection } = useConnection();
    const { publicKey, wallet } = useWallet();

    const handleBurn = async () => {
        try {
            if (!publicKey || !wallet?.adapter) {
                setStatus("❌ Wallet not connected");
                return;
            }

            const program = getProgram(wallet); // This function should return the program instance

            const tokenAccounts = await program.provider.connection.getParsedTokenAccountsByOwner(publicKey, {
                mint: MINT_ADDRESS,
            });

            const fromTokenAccount = tokenAccounts.value[0]?.pubkey;

            if (!fromTokenAccount) {
                setStatus("❌ No token account found for this wallet");
                return;
            }

            await program.methods
                .burnTokens(new BN(amount))
                .accounts({
                    authority: publicKey,
                    mint: MINT_ADDRESS,
                    fromTokenAccount,
                    tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
                })
                .rpc();

            setStatus(`🔥 Successfully burned ${amount} tokens`);
        } catch (err) {
            console.error(err);
            setStatus("❌ Error burning tokens");
        }
    };

    return (
        <div style={{ marginTop: "2rem" }}>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount to burn"
                style={{ padding: "0.5rem", marginRight: "0.5rem" }}
            />
            <button onClick={handleBurn} disabled={!publicKey}>
                Burn $XOLO
            </button>
            <p>{status}</p>
        </div>
    );
}
