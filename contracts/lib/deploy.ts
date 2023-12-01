const { ethers, network, upgrades, artifacts } = require("hardhat");

const expirationDuration = ethers.constants.MaxUint256;
const maxNumberOfKeys = ethers.constants.MaxUint256;
const keyPrice = 0;

/**
 * Deploy!
 * @param unlock
 * @returns
 */
const deploy = async (unlock: any, hookAddress?: string, start?: number) => {
  let locks = [];

  if (network.config.chainId === 31337) {
    await unlock.deployProtocol();
  }

  const Hook = await ethers.getContractFactory("AdventHookNext");
  let hook;
  if (hookAddress) {
    // Upgrade?
    hook = await upgrades.upgradeProxy(hookAddress, Hook);
    console.log(`Upgraded Advent hook at ${hook.address}`);
    // Then get all the locks!
    for (let i = 0; i < 24; i++) {
      const lockAddress = await hook.lockByDay(i + 1);
      const lock = await unlock.getLockContract(lockAddress);
      locks.push(lock);
    }
  } else {
    // deploy locks
    for (let i = 0; i < 24; i++) {
      const { lock } = await unlock.createLock({
        expirationDuration,
        maxNumberOfKeys,
        keyPrice,
        name: `Unlock Advent Calendar 2023 - Day ${i + 1}`,
      });
      locks.push(lock);
    }

    // deploy hook
    hook = await upgrades.deployProxy(Hook, [
      locks.map((lock) => lock.address),
      start,
    ]);
    await hook.deployed();
    console.log(`Deployed Advent hook at ${hook.address}`);
  }

  // Check that the hook is set on every lock!
  for (let i = 0; i < 24; i++) {
    const existingHook = await locks[i].onKeyPurchaseHook();
    if (existingHook !== hook.address) {
      await (
        await locks[i].setEventHooks(
          hook.address,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero
        )
      ).wait();
    }
  }

  // Check that the metadata is set on every lock correctly
  for (let i = 0; i < 24; i++) {
    const tokenUri = await locks[i].tokenURI(1);
    if (tokenUri !== `https://advent.unlock-protocol.com/api/${i + 1}/1`) {
      console.log(locks[i].address, tokenUri);
      await (
        await locks[i].setLockMetadata(
          `Unlock Advent Calendar 2023 - Day ${i + 1}`,
          `GIFT`,
          `https://advent.unlock-protocol.com/api/${i + 1}/`
        )
      ).wait();
    }
  }
  return [locks, hook];
};

export default deploy;
