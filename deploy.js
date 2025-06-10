const { ethers, Wallet } = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  //connecting with blockchain using Ganasche
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  //Initialize the wallet
  //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");

  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );

  wallet = await wallet.connect(provider);
  //utf8-encoding for file
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet); //ContractFactory- helper class to deploy the contract.
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  console.log("Contract deployed at:", contract.address);
  const deploymentReceipt = await contract.deployTransaction.wait(1); //wait for 1 block to complete
  //console.log("Here is the deployment tx:");
  //console.log(contract.deployTransaction);
  //console.log("Here is the tx receipt:");
  //console.log(deploymentReceipt);
  const currentFavNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavNumber = await contract.retrieve();
  console.log(`Updated Favorite Number is: ${updatedFavNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
