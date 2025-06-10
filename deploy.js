const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
  //connecting with blockchain using Ganasche
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  //Initialize the wallet
  const wallet = new ethers.Wallet(
    "0x428e554471b763e4b4e5f99f96448ff1e8c525530ba375da423afe3cdf0b31c0",
    provider
  );
  //utf8-encoding for file
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);    //ContractFactory- helper class to deploy the contract.
  console.log("Deploying, please wait...");
   const contract = await contractFactory.deploy();
  console.log("Contract deployed at:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
