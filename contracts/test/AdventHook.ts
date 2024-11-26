import { expect } from "chai";
import deploy from "../lib/deploy";
import ERC20 from "./ERC20.abi";
const { network, unlock, ethers } = require("hardhat");

const expirationDuration = ethers.constants.MaxUint256;
const maxNumberOfKeys = ethers.constants.MaxUint256;
const keyPrice = 0;

const moveToTime = async (futureDate: Date) => {
  // console.log(
  //   `Before, we are now ${new Date(
  //     (await getCurrentTime()) * 1000
  //   ).toUTCString()}, moving to ${futureDate.toUTCString()}`
  // );
  await network.provider.request({
    method: "evm_increaseTime",
    params: [Math.ceil(futureDate.getTime() / 1000 - (await getCurrentTime()))],
  });
  await network.provider.request({
    method: "evm_mine",
    params: [],
  });
  console.log(
    `After, we are now ${new Date(
      (await getCurrentTime()) * 1000
    ).toUTCString()}`
  );
};

const getCurrentTime = async () => {
  const blockNumBefore = await ethers.provider.getBlockNumber();
  const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  return blockBefore.timestamp;
};

describe("AdventHook", function () {
  it("should work for the base sequence", async () => {
    let [user] = await ethers.getSigners();

    const now = await getCurrentTime();
    const start = new Date((now + 60 * 60 * 24 * 3) * 1000); // in 3 days!
    // deploy all locks
    const [locks, hook] = await deploy(
      unlock,
      undefined,
      start.getTime() / 1000
    );

    // Test in the future only!
    console.log(
      `We are now ${new Date((await getCurrentTime()) * 1000).toUTCString()}`
    );

    let currentDay = 1;

    // Then purchase day 1 (fail)
    console.log(`Buy first day, too early`);
    await expect(
      locks[0]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).to.reverted;
    console.log(`Failed first day as expected because it is too early`);

    // Move to day 1
    await moveToTime(
      new Date(start.getTime() + 1000 * 60 * 60 * 24 * currentDay)
    );

    // Then purchase day 1 (success)
    console.log(`Buy first day, in time`);
    await expect(
      locks[0]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).not.to.reverted;
    console.log(`Succeeded first day as expected`);

    // TODO Let's try to purchase day 3 and show that it fails!
    console.log(`Buy day 3 should fail as it is too early`);
    await expect(
      locks[2]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).to.reverted;
    console.log(
      `Failed 3rd day as expected because we have not purchased day 2 first`
    );

    // All good!
    // Let's now buy all the days left!
    for (let i = currentDay + 1; i < 25; i++) {
      await moveToTime(
        new Date(start.getTime() + 1000 * 60 * 60 * 24 * currentDay)
      );
      console.log(`Buy ${currentDay}`);
      await expect(
        locks[i - 1]
          .connect(user)
          .purchase([0], [user.address], [user.address], [user.address], [[]])
      ).not.to.reverted;
      currentDay += 1;
    }
  });
});
