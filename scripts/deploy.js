const hre = require("hardhat");

async function main() {
  const greeter = await hre.ethers.deployContract("Greeter", ["Hello, Hardhat!"]);
  await greeter.waitForDeployment();

  console.log("Greeter deployed to:", (await greeter.getAddress()).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });