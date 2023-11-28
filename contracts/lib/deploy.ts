const { ethers, network, upgrades } = require("hardhat");

const expirationDuration = ethers.constants.MaxUint256;
const maxNumberOfKeys = ethers.constants.MaxUint256;
const keyPrice = 0;

/**
 * Deploy!
 * @param unlock
 * @returns
 */
const deploy = async (
  unlock: any,
  lockAddresses?: string[],
  hookAddress?: string
) => {
  let locks = [];

  if (network.config.chainId === 31337) {
    await unlock.deployProtocol();
  }

  if (!lockAddresses) {
    for (let i = 0; i < 24; i++) {
      const { lock } = await unlock.createLock({
        expirationDuration,
        maxNumberOfKeys,
        keyPrice,
        name: `day ${i}`,
      });
      locks.push(lock);
    }
  } else {
    locks = await Promise.all(
      lockAddresses.map(async (address) => {
        return await unlock.getLockContract(address);
      })
    );
  }

  const Hook = await ethers.getContractFactory("AdventHook");
  let hook;
  if (!hookAddress) {
    // deploy hook
    hook = await upgrades.deployProxy(Hook, [
      locks.map((lock) => lock.address),
      new Date("2023-11-01").getTime() / 1000,
    ]);
    console.log(`Deployed Advent hook at ${hook.address}`);
  } else {
    // Upgrade?
    hook = await upgrades.upgradeProxy(hookAddress, Hook);
    console.log(`Deployed Advent hook at ${hook.address}`);
  }
  return [locks, hook];
};

export default deploy;
