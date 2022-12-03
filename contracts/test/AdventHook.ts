import { expect } from "chai";
import deploy from "../lib/deploy";
const { network, unlock, ethers } = require("hardhat");

const expirationDuration = ethers.constants.MaxUint256;
const maxNumberOfKeys = ethers.constants.MaxUint256;
const keyPrice = 0;

const moveToTime = async (futureDate: Date) => {
  await network.provider.request({
    method: "evm_increaseTime",
    params: [Math.ceil(futureDate.getTime() / 1000 - (await getCurrentTime()))],
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

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0xF5C28ce24Acf47849988f147d5C75787c0103534"],
    });

    const signer = await ethers.getSigner(
      "0xF5C28ce24Acf47849988f147d5C75787c0103534"
    );

    // deploy all locks
    const [locks, hook] = await deploy(unlock, signer);

    // Test in the future only!
    const now = new Date();
    let currentDay = 1;
    while (now.getDate() > currentDay) {
      // We need to buy all the days!
      console.log(`Buy ${currentDay}`);
      await expect(
        locks[currentDay - 1]
          .connect(user)
          .purchase([0], [user.address], [user.address], [user.address], [[]])
      ).not.to.reverted;
      currentDay += 1;
      console.log("FINE!");
    }

    console.log("OK READY FOR ");

    // Then purchase day 1 (fail)
    await expect(
      locks[currentDay]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).to.reverted;

    // Move to day 1
    await moveToTime(new Date(`2022/12/${currentDay + 1}`));

    // Then purchase day 1 (success)
    await expect(
      locks[currentDay]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).not.to.reverted;

    // Then purchase day 2 (fail)
    await expect(
      locks[currentDay + 1]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).to.reverted;

    // Move to day 2
    await moveToTime(new Date(`2022/12/${currentDay + 2}`));

    // Then purchase day 2 (success)
    await expect(
      locks[currentDay + 1]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).not.to.reverted;

    // Move to day 4
    await moveToTime(new Date(`2022/12/${currentDay + 4}`));

    // Then purchase day 4 (fail)
    await expect(
      locks[currentDay + 3]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).to.reverted;

    // Then purchase day 3 (success)
    await expect(
      locks[currentDay + 2]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).not.to.reverted;

    // Then purchase day 4 (success)
    await expect(
      locks[currentDay + 3]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).not.to.reverted;

    // All good!
    // Let's now buy all the days left!
    for (let i = currentDay + 4; i < 25; i++) {
      await moveToTime(new Date(`2022/12/${i}`));
      await expect(
        locks[i - 1]
          .connect(user)
          .purchase([0], [user.address], [user.address], [user.address], [[]])
      ).not.to.reverted;
    }
    console.log("SUCCESS!");
  });
});
