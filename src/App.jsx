import { useState } from "react";
import './App.css';
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  const createMnemonic = async () => {
    const mnemonic = await generateMnemonic();
    console.log({ mnemonic });
    setMnemonic(mnemonic);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Mnemonic copied to clipboard!");
  };

  return (
    <div className="app-container">
      <h1>My Mini Wallet</h1>
      <div className="mnemonic-section">
        <button onClick={createMnemonic} className="mnemonic-button">
          Create Seed Phrase
        </button>

        {mnemonic && (
          <div className="mnemonic-box">
            {/* <h3>Your Seed Phrase</h3> */}
            <p>{mnemonic}</p>
            <button className="copy-button" onClick={() => copyToClipboard(mnemonic)}>Copy</button>
          </div>
        )}
      </div>

      {/* <div className="wallet-section"> */}
        {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
        {mnemonic && <EthWallet mnemonic={mnemonic} />}
      {/* </div> */}
    </div>
  );
}

export default App;
