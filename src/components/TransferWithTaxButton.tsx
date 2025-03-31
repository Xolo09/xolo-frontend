import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getProgram } from '../utils/getProgram';
import * as anchor from '@coral-xyz/anchor';

const TransferWithTaxButton = (): JSX.Element => {
    const wallet = useWallet();
    const [recipientAddress, setRecipientAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTransfer = async () => {
        try {
            setLoading(true);

            if (
                !wallet.publicKey ||
                !wallet.signTransaction ||
                !wallet.signAllTransactions
            ) {
                alert('Wallet not connected');
                return;
            }

            const program = await getProgram(wallet);

            const sender = wallet.publicKey;
            const recipient = new PublicKey(recipientAddress);

            const tx = await program.methods
                .transferWithTax(new anchor.BN(1000)) // Replace 1000 with real amount
                .accounts({
                    sender,
                    recipient,
                    // Add more accounts as needed
                })
                .rpc();

            console.log('Transaction successful:', tx);
            alert('Transfer complete!');
        } catch (error) {
            console.error('Transfer failed:', error);
            alert('Error occurred during transfer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <TextField
                fullWidth
                label="Recipient Address"
                variant="outlined"
                value={recipientAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRecipientAddress(e.target.value)
                }
                style={{ marginBottom: '1rem' }}
            />
            <Button
                variant="contained"
                color="primary"
                disabled={!wallet.connected || loading}
                onClick={handleTransfer}
            >
                {loading ? 'Transferring...' : 'Transfer with Tax'}
            </Button>
        </div>
    );
};

export default TransferWithTaxButton;


