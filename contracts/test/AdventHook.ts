import { expect } from "chai";
const { network, unlock, ethers } = require("hardhat");

const expirationDuration = ethers.constants.MaxUint256;
const maxNumberOfKeys = ethers.constants.MaxUint256;
const keyPrice = 0;

const moveToTime = async (dateAsString: string) => {
  await network.provider.request({
    method: "evm_increaseTime",
    params: [
      Math.ceil(
        new Date(dateAsString).getTime() / 1000 - (await getCurrentTime())
      ),
    ],
  });
};

const getCurrentTime = async () => {
  const blockNumBefore = await ethers.provider.getBlockNumber();
  const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  return blockBefore.timestamp;
};

describe("AdventHook", function () {
  it("should work", async () => {
    let [user] = await ethers.getSigners();

    // deploy Unlock
    await unlock.deployProtocol();

    // deploy all locks
    const locks = [];
    for (let i = 1; i < 25; i++) {
      const { lock } = await unlock.createLock({
        expirationDuration,
        maxNumberOfKeys,
        keyPrice,
        name: `Unlock Advent Calendar 2022 - day {i}`,
      });
      locks.unshift(lock);
    }

    // deploy hook
    const Hook = await ethers.getContractFactory("AdventHook");
    const hook = await Hook.deploy(locks.map((lock) => lock.address));

    // Set hook on locks
    for (let i = 0; i < 24; i++) {
      await locks[i].setEventHooks(
        hook.address,
        ethers.constants.AddressZero,
        ethers.constants.AddressZero,
        ethers.constants.AddressZero,
        ethers.constants.AddressZero,
        ethers.constants.AddressZero,
        ethers.constants.AddressZero
      );
    }

    // Then purchase day 1 (fail)
    await expect(
      locks[0].purchase(
        [0],
        [user.address],
        [user.address],
        [user.address],
        [[]]
      )
    ).to.reverted;

    // Move to day 1
    await moveToTime("2022/12/01");

    // Then purchase day 1 (success)
    await expect(
      locks[0].purchase(
        [0],
        [user.address],
        [user.address],
        [user.address],
        [[]]
      )
    ).not.to.reverted;

    // Then purchase day 2 (fail)
    await expect(
      locks[1].purchase(
        [0],
        [user.address],
        [user.address],
        [user.address],
        [[]]
      )
    ).to.reverted;

    // Move to day 2
    await moveToTime("2022/12/02");

    // Then purchase day 2 (success)
    await expect(
      locks[1].purchase(
        [0],
        [user.address],
        [user.address],
        [user.address],
        [[]]
      )
    ).not.to.reverted;

    // Move to day 4
    await moveToTime("2022/12/04");

    // Then purchase day 4 (fail)
    await expect(
      locks[3].purchase(
        [0],
        [user.address],
        [user.address],
        [user.address],
        [[]]
      )
    ).to.reverted;

    // Then purchase day 3 (success)
    await expect(
      locks[2].purchase(
        [0],
        [user.address],
        [user.address],
        [user.address],
        [[]]
      )
    ).not.to.reverted;

    // Then purchase day 4 (success)
    await expect(
      locks[3].purchase(
        [0],
        [user.address],
        [user.address],
        [user.address],
        [[]]
      )
    ).not.to.reverted;

    // All good!
    // Let's now buy all the days left!
    for (let i = 5; i < 25; i++) {
      await moveToTime(`2022/12/${i}`);
      await expect(
        locks[i - 1].purchase(
          [0],
          [user.address],
          [user.address],
          [user.address],
          [[]]
        )
      ).not.to.reverted;
    }
  });
});
