const { network, unlock, ethers, getChainId } = require("hardhat");
import deploy from "../lib/deploy";

/**
 * main!
 * @returns
 */
async function main() {
  const [user] = await ethers.getSigners();
  const { chainId } = await ethers.provider.getNetwork();
  console.log(`Deploying from ${user.address} on ${chainId}`);
  const [locks, hook] = await deploy(unlock);

  console.log(`Hook`, hook.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
