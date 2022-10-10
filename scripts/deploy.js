// We require the Hardhat Runtime Environment
const hre = require("hardhat");

async function main() {
  const MyDai = await hre.ethers.getContractFactory("MyDaiToken");
  const myDai = await MyDai.deploy();

  await myDai.deployed();

  console.log(`${await myDai.name()} contract deployed to ${myDai.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
