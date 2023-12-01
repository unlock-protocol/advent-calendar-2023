const { network, unlock, ethers } = require("hardhat");
import deploy from "../lib/deploy";

/**
 * main!
 * @returns
 */
async function main() {
  const [user] = await ethers.getSigners();
  const { chainId } = await ethers.provider.getNetwork();
  console.log(`Deploying from ${user.address} on ${chainId}`);

  if (chainId === 5) {
    const [locks, hook] = await deploy(
      unlock,
      "0x29eE24817a3aA5A89be094728558A3E3511a1eb6"
    );
  } else if (chainId === 84532) {
    const [locks, hook] = await deploy(
      unlock,
      undefined, // No network yet!
      new Date("2023-12-01 12:00:00").getTime() / 1000
    );
  } else if (chainId === 31337) {
    const [locks, hook] = await deploy(
      unlock,
      undefined, // No network yet!
      new Date("2023-11-01").getTime() / 1000
    );
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
