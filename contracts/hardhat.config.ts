import { HardhatUserConfig } from "hardhat/config";
import "@unlock-protocol/hardhat-plugin";
import "@openzeppelin/hardhat-upgrades";
import { networks } from "@unlock-protocol/networks";

const unlockNetworks = Object.keys(networks).reduce((prev, current) => {
  const network = networks[current];
  return {
    ...prev,
    [network.chain]: {
      chainId: Number(network.id),
      url: network.provider,
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY || process.env.TESTER_PRIVATE_KEY
          ? [process.env.DEPLOYER_PRIVATE_KEY || process.env.TESTER_PRIVATE_KEY]
          : [],
    },
  };
}, {});

const config: HardhatUserConfig = {
  networks: unlockNetworks,
  solidity: "0.8.17",
};

export default config;
