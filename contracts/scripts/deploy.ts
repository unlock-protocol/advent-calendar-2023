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
  const [locks, hook] = await deploy(
    unlock,
    [
      "0xd6dc09494601531c24ea273b3bfd12be4069bab1",
      "0x91709c051ad4e5fbbfcc6eea7908cfe1d5d8aefc",
      "0x5e7fa2c880f38971fdab65b5168f5797edde9614",
      "0xf60909e99345dab0fb6d26b56c5356deb2d2b4a7",
      "0x3c0f537762851a5fd774a8e66e18ac79b1d224a7",
      "0xdf511e0e57ec3fd4441f59e7fa12c057e747be72",
      "0xa1e9ea9e324d6281db4b4ca458e530d37b8c0d3d",
      "0x877f612681d6b832369a04bca293e21fa9025147",
      "0xbe73425327e6f5ab0d87e41561b4d60931be76cb",
      "0x668e56888713d417a260e79ad80c07c38a96e819",
      "0x7de509b53fdaed932ae8b8a630eb98d3727c90c6",
      "0x0655ebfa6b3feb1d33d041d6417d934633844e8c",
      "0x9da8a0f6430ce562b492d16563d714bb1989442b",
      "0xa9e8cd67a910fb21e0623fd8dfdfb22a747306d1",
      "0x53a1fdeebdafed23d59a0c3a8d0d59aa7ab71f5b",
      "0x44066443a3043e77e4a2ec16ec8413537e3339ae",
      "0xbd07a679f8eb42a9e26d8f04153144894fed74be",
      "0xac61c1d5bf3a2e175a867a597223a9630b9a7eb4",
      "0x510a1c3fde353b7fce2dbb33c1cd477f5ef61d2b",
      "0x8564aa4ff5d27466a3aef3bc88ed541b4f530e13",
      "0x8315156e7c7033c95bbba2e368efa947f94f17ad",
      "0x3efd5836ae3edb6e68f40d4b9abecdbd8e710f26",
      "0x7e4e7cdaacf6a5a81413f73b6de4a7d2d9427d8d",
      "0x2516a877838faa7e7f6ce83cd9f877b4a3f1d842",
    ],
    "0x29eE24817a3aA5A89be094728558A3E3511a1eb6"
  );

  console.log(`Hook`, hook.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
