# Mini Wallet Generator

A React-based web application that generates HD wallets for Solana and Ethereum using a BIP39 mnemonic seed. Users can create new wallets, view addresses, copy them to the clipboard, and reveal private keys in a simple UI.

## Features

- Generate a BIP39 seed phrase (mnemonic).
- Create multiple Solana wallets using ed25519 derivation paths.
- Create multiple Ethereum wallets using standard Ethereum derivation paths.
- Copy wallet addresses to clipboard.
- Reveal private keys (hidden by default for security).
- Responsive and clean user interface for both mobile and desktop devices.

## Technology Stack

- **Frontend:** React, JavaScript
- **Blockchain Libraries:**
  - **Solana:** `@solana/web3.js`, `ed25519-hd-key`
  - **Ethereum:** `ethers.js`, `bip39`
  - **Cryptography:** `tweetnacl`
  
## Getting Started

### Prerequisites

Before you start, ensure you have the following installed on your machine:

- Node.js (v16+)
- NPM or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/web-based-HD-wallet.git
   ```

2. Move to directory
    ```bash
    cd web-based-HD-wallet
    ```

3. Install packages
    ```bash
    npm i
    ```

4. Run app
    ```bash
    npm run dev
    ```
    
