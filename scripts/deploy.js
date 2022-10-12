// We require the Hardhat Runtime Environment
const hre = require("hardhat");
const {ethers} = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseEther(n.toString())
}

async function main() {
  const accounts = await ethers.getSigners()
  const exchangeFeeAccount = accounts[1]
  const exchangeFeePercent = 10

  const MyDai = await hre.ethers.getContractFactory("Token");
  const myDai = await MyDai.deploy("Colin's Stable Coin", 'myDai', tokens(1000000));

  await myDai.deployed();

  console.log(`${await myDai.name()} contract deployed to ${myDai.address}`);

  const Exchange = await hre.ethers.getContractFactory("Exchange");
  const exchange = await Exchange.deploy(exchangeFeeAccount.address, exchangeFeePercent);

  await exchange.deployed();

  console.log(`Exchange contract deployed to ${exchange.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
