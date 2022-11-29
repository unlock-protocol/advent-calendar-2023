const { network, unlock, ethers, getChainId } = require("hardhat");
import deploy from "../lib/deploy";

/**
 * main!
 * @returns
 */
async function main() {
  const { chainId } = await ethers.provider.getNetwork();

  if (chainId === 31337) {
    await unlock.deployProtocol();
  }

  const [locks, hook] = await deploy(unlock);
  for (let i = 0; i < locks.length; i++) {
    console.log("______________");
    console.log(`Lock`, locks[i].address, await locks[i].name());
    await locks[i].addLockManager("0xF5C28ce24Acf47849988f147d5C75787c0103534");
    await locks[i].renounceLockManager();
    console.log(await hook.lockByDay(i + 1));
    console.log(await hook.dayByLock(locks[i].address));
  }
  console.log(`Hook`, hook.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
