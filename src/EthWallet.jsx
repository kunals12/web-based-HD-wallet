import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import './Wallets.css'; // Assuming you have a CSS file

export const EthWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    async function createEthWallet() {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);

        setWallets([...wallets, { address: wallet.address, privateKey }]);
        setCurrentIndex(currentIndex + 1);
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const revealPrivateKey = (privateKey) => {
        return privateKey;
    };

    return (
        <div className="wallet-container">
            {/* <h2>Create Ethereum Wallet</h2> */}
            <button onClick={createEthWallet} className="wallet-button">Add ETH Wallet</button>

            <div className="wallet-list">
                {wallets.map((wallet, index) => (
                    <div key={index} className="wallet-item">
                        <span>Eth - {wallet.address}</span>
                        <button className="copy-button" onClick={() => copyToClipboard(wallet.address)}>Copy</button>

                        <button className="reveal-button" onClick={() => alert(`Private Key: ${revealPrivateKey(wallet.privateKey)}`)}>
                            Reveal Private Key
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
