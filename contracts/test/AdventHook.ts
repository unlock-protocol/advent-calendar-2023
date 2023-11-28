import { expect } from "chai";
import deploy from "../lib/deploy";
import ERC20 from "./ERC20.abi";
const { network, unlock, ethers } = require("hardhat");

const expirationDuration = ethers.constants.MaxUint256;
const maxNumberOfKeys = ethers.constants.MaxUint256;
const keyPrice = 0;

const moveToTime = async (futureDate: Date) => {
  console.log(
    `Before, we are now ${new Date(
      (await getCurrentTime()) * 1000
    ).toUTCString()}, moving to ${futureDate.toUTCString()}`
  );
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
  it("should work", async () => {
    let [user] = await ethers.getSigners();

    // deploy all locks
    const [locks, hook] = await deploy(unlock);

    // console.log("Buy before");
    // await expect(
    //   locks[0]
    //     .connect(user)
    //     .purchase([0], [user.address], [user.address], [user.address], [[]])
    // ).not.to.reverted;
    // console.log("Buy before cool!");

    // Set hook on locks
    for (let i = 1; i < 25; i++) {
      await locks[i - 1]
        .connect(user)
        .setEventHooks(
          hook.address,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero,
          ethers.constants.AddressZero
        );
    }

    // Test in the future only!
    console.log(
      `We are now ${new Date((await getCurrentTime()) * 1000).toUTCString()}`
    );

    console.log(
      await locks[0].purchasePriceFor(user.address, user.address, [])
    );

    const now = new Date();
    let currentDay = 1;
    while (now.getDate() >= currentDay && currentDay < 24) {
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

    // Then purchase day 1 (fail)
    console.log(`Buy ${currentDay}`);
    await expect(
      locks[currentDay - 1]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).to.reverted;
    console.log(`Failed ${currentDay} as expected because it is too early`);

    // Move to day 1
    await moveToTime(new Date(`2022/12/${currentDay}`));

    // Then purchase day 1 (success)
    console.log(`Buy ${currentDay}`);
    await expect(
      locks[currentDay - 1]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).not.to.reverted;
    console.log(`Succeeded ${currentDay} as expected`);
    currentDay += 1;

    // Then purchase day 2 (fail)
    console.log(`Buy ${currentDay}`);
    await expect(
      locks[currentDay - 1]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).to.reverted;
    console.log(`Failed ${currentDay} as expected because it is too early`);

    // Move by 1 day
    await moveToTime(new Date(`2022/12/${currentDay + 1}`));

    // Then purchase day 2 (success)
    console.log(`Buy ${currentDay}`);
    await expect(
      locks[currentDay - 1]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).not.to.reverted;
    console.log(`Succeeded ${currentDay} as expected`);
    currentDay += 1;

    // Move to day 4
    await moveToTime(new Date(`2022/12/${currentDay + 2}`));

    // Then purchase day 4 (fail)
    console.log(`Buy ${currentDay}`);
    await expect(
      locks[currentDay]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).to.reverted;
    console.log(`Failed ${currentDay} as expected as missing previous day`);

    // Then purchase day 3 (success)
    console.log(`Buy ${currentDay}`);
    await expect(
      locks[currentDay - 1]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).not.to.reverted;
    currentDay += 1;
    console.log(`Succeeded ${currentDay} as expected`);

    // Then purchase day 4 (success)
    console.log(`Buy ${currentDay}`);
    await expect(
      locks[currentDay - 1]
        .connect(user)
        .purchase([0], [user.address], [user.address], [user.address], [[]])
    ).not.to.reverted;
    currentDay += 1;
    console.log(`Succeeded ${currentDay} as expected`);

    console.log(`Finish it! ${currentDay}`);

    // All good!
    // Let's now buy all the days left!
    for (let i = currentDay; i < 25; i++) {
      await moveToTime(new Date(`2022/12/${i}`));
      console.log(`Buy ${currentDay}`);
      await expect(
        locks[i - 1]
          .connect(user)
          .purchase([0], [user.address], [user.address], [user.address], [[]])
      ).not.to.reverted;
      currentDay += 1;
    }
    console.log("SUCCESS!");

    // Verify balance of ERC20 on day 5
    // const balanceAfter = await usdc.balanceOf(user.address);
    // console.log(balanceAfter);
    // expect(beforeBalance).greaterThan(balanceAfter);
  });
});
