import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import './Wallets.css'; 

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    async function createSolanaWallet() {
        const seed = await mnemonicToSeed(mnemonic);  // BIP39 mnemonic to seed
        const path = `m/44'/501'/${currentIndex}'/0'`;  // Derivation path for Solana
        const derivedSeed = derivePath(path, seed.toString("hex")).key;  // Deriving the seed using ed25519 path
        
        const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);  // Using the first 32 bytes as seed for keypair
        const secretKey = keypair.secretKey.slice(0, 32);  // Extract the private key (first 32 bytes of secretKey)
        
        setWallets([...wallets, { publicKey: Keypair.fromSecretKey(keypair.secretKey).publicKey.toBase58(), secretKey }]);
        setCurrentIndex(currentIndex + 1);
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const revealPrivateKey = (secretKey) => {
        return Buffer.from(secretKey).toString('hex');  // Convert to hexadecimal string
    };

    return (
        <div className="wallet-container">
            {/* <h2>Create Solana Wallet</h2> */}
            <button onClick={createSolanaWallet} className="wallet-button">Add Solana Wallet</button>

            <div className="wallet-list">
                {wallets.map((wallet, index) => (
                    <div key={index} className="wallet-item">
                        <span>Solana - {wallet.publicKey}</span>
                        <button className="copy-button" onClick={() => copyToClipboard(wallet.publicKey)}>Copy</button>

                        <button className="reveal-button" onClick={() => alert(`Private Key: ${revealPrivateKey(wallet.secretKey)}`)}>
                            Reveal Private Key
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
