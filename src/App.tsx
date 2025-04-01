import React from 'react';
import TransferWithTaxButton from './components/TransferWithTaxButton';
import { BurnButton } from './components/BurnButtonComponent'; // this one IS a named export

export default function App() {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#1a1a1a',
      color: 'white',
      minHeight: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ color: '#ff4d4f' }}>🔥 $XOLO Token Tools</h1>
      <p>Connect your wallet to burn or transfer tokens with tax.</p>

      <div style={{ marginTop: '2rem' }}>
        <TransferWithTaxButton />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <BurnButton />
      </div>
    </div>
  );
}





