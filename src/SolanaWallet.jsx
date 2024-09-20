import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import './Wallets.css'; // Assuming you have a CSS file

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    async function createSolanaWallet() {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secretKey);

        setWallets([...wallets, { publicKey: keypair.publicKey.toBase58(), secretKey }]);
        setCurrentIndex(currentIndex + 1);
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const revealPrivateKey = (secretKey) => {
        return Buffer.from(secretKey).toString('hex');
    };

    return (
        <div className="wallet-container">
            <h2>Create Solana Wallet</h2>
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
