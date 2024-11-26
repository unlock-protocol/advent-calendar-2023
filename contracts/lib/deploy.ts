const { ethers, network, upgrades } = require("hardhat");

const expirationDuration = ethers.MaxUint256;
const maxNumberOfKeys = ethers.MaxUint256;
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
    hook.address = await hook.getAddress();
    console.log(`Upgraded Advent hook at ${await hook.getAddress()}`);
    // Then get all the locks!
    for (let i = 0; i < 24; i++) {
      const lockAddress = await hook.lockByDay(i + 1);
      const lock = await unlock.getLockContract(lockAddress);
      lock.address = lockAddress;
      locks.push(lock);
    }
  } else {
    console.log("ready to deploy the locks!");
    // deploy locks
    for (let i = 0; i < 24; i++) {
      console.log("Deploying lock", i + 1);
      const { lock } = await unlock.createLock({
        expirationDuration,
        maxNumberOfKeys,
        keyPrice,
        name: `Unlock Advent Calendar 2024 - Day ${i + 1}`,
      });
      lock.address = await lock.getAddress();

      locks.push(lock);
    }

    const lockAddresses = locks.map((lock) => lock.address);

    // deploy hook
    hook = await upgrades.deployProxy(Hook, [lockAddresses, start]);
    await hook.waitForDeployment();
    console.log(`Deployed Advent hook at ${await hook.getAddress()}`);
    hook.address = await hook.getAddress();
  }

  // Check that the hook is set on every lock!
  for (let i = 0; i < 24; i++) {
    const existingHook = await locks[i].onKeyPurchaseHook();
    console.log("Setting hook on lock", i + 1);
    if (existingHook !== hook.address) {
      await (
        await locks[i].setEventHooks(
          hook.address,
          ethers.ZeroAddress,
          ethers.ZeroAddress,
          ethers.ZeroAddress,
          ethers.ZeroAddress,
          ethers.ZeroAddress,
          ethers.ZeroAddress
        )
      ).wait();
    }
  }

  // Check that the metadata is set on every lock correctly
  for (let i = 0; i < 24; i++) {
    console.log("Checking token URI on lock", i + 1);
    const tokenUri = await locks[i].tokenURI(1);
    if (tokenUri !== `https://advent.unlock-protocol.com/api/${i + 1}/1`) {
      await (
        await locks[i].setLockMetadata(
          `Unlock Advent Calendar 2024 - Day ${i + 1}`,
          `GIFT`,
          `https://advent.unlock-protocol.com/api/${i + 1}/`
        )
      ).wait();
    }
  }

  // Add lock managers on every lock!
  for (let i = 0; i < 24; i++) {
    console.log("Checking lock managers on", i + 1);

    // unlock-protocol.eth
    if (
      !(await locks[i].isLockManager(
        "0xF5C28ce24Acf47849988f147d5C75787c0103534"
      ))
    ) {
      await (
        await locks[i].addLockManager(
          "0xF5C28ce24Acf47849988f147d5C75787c0103534"
        )
      ).wait();
    }

    // Ceci 0x7d30224b003A6638b097c49522e8Ef977BF8dFc9
    if (
      !(await locks[i].isLockManager(
        "0x7d30224b003A6638b097c49522e8Ef977BF8dFc9"
      ))
    ) {
      await (
        await locks[i].addLockManager(
          "0x7d30224b003A6638b097c49522e8Ef977BF8dFc9"
        )
      ).wait();
    }
    // Manuel 0xd806A01E295386ef7a7Cea0B9DA037B242622743
    if (
      !(await locks[i].isLockManager(
        "0xd806A01E295386ef7a7Cea0B9DA037B242622743"
      ))
    ) {
      await (
        await locks[i].addLockManager(
          "0xd806A01E295386ef7a7Cea0B9DA037B242622743"
        )
      ).wait();
    }
  }

  return [locks, hook];
};

export default deploy;
