# SimpleStorage Smart Contract Deployment using Ethers.js, Ganache, and Alchemy

This project demonstrates how to deploy and interact with a simple smart contract using **Solidity**, **Ethers.js**, **Ganache** for local development, and **Alchemy** for deploying to the Sepolia testnet.

---

## 🔧 Tools Used

* **Solidity** – to write the smart contract (`SimpleStorage.sol`)
* **Ganache** – a personal Ethereum blockchain for local development
* **Ethers.js** – a JavaScript library to interact with the Ethereum blockchain
* **Node.js** – to run JavaScript files outside the browser
* **Alchemy** – to connect to the Sepolia testnet
* **dotenv** – to manage environment variables securely

---

## 📋 What This Project Does

The project allows you to:

* Store a favorite number on the blockchain.
* Retrieve the stored number.
* Add a person with their name and favorite number.
* Map names to favorite numbers using a `mapping`.
* Deploy and interact with the contract using JavaScript, not just Remix.

---

## 🧠 How It Works (Step-by-Step)

### 1. **Write the Smart Contract**

You write a smart contract called `SimpleStorage.sol`. It:

* Lets users store and retrieve a number.
* Maps names to numbers using `mapping`.
* Keeps track of people added using a `struct` and an array.

---

### 2. **Encrypt Your Private Key**

Before deploying the contract, you must **encrypt your wallet’s private key** to protect it.

To do this:

```bash
node encryptKey.js
```

This script uses your raw private key and password (from `.env`) to generate a secure `.encryptedKey.json` file.

Why?
👉 Never store or upload raw private keys. Encryption adds a layer of safety.

---

### 3. **Deploy to Sepolia Testnet**

Now that your key is encrypted, you can deploy the contract:

```bash
node Deploy.js
```

What happens in this script:

* Connects to Sepolia via Alchemy using your RPC URL.
* Decrypts your encrypted key.
* Reads the ABI and binary code from compiled contract files.
* Deploys the contract to the blockchain.
* Waits for the transaction to be mined (confirmed).
* Interacts with the contract:

  * Reads the default stored value.
  * Updates it with a new value.
  * Reads it again to confirm the change.


