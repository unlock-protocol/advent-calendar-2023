import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
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
      gasPrice: 1000000,
      accounts:
        process.env.DEPLOYER_PRIVATE_KEY || process.env.TESTER_PRIVATE_KEY
          ? [process.env.DEPLOYER_PRIVATE_KEY || process.env.TESTER_PRIVATE_KEY]
          : [],
    },
  };
}, {});

const config: HardhatUserConfig = {
  networks: unlockNetworks,
  etherscan: {
    apiKey: {
      polygon: "W9TVEYKW2CDTQ94T3A2V93IX6U3IHQN5Y3",
      goerli: "HPSH1KQDPJTNAPU3335G931SC6Y3ZYK3BF",
      mainnet: "HPSH1KQDPJTNAPU3335G931SC6Y3ZYK3BF",
      bsc: "6YUDRP3TFPQNRGGZQNYAEI1UI17NK96XGK",
      gnosis: "BSW3C3NDUUBWSQZJ5FUXBNXVYX92HZDDCV",
      optimisticEthereum: "V51DWC44XURIGPP49X85VZQGH1DCBAW5EC",
      arbitrumOne: "W5XNFPZS8D6JZ5AXVWD4XCG8B5ZH5JCD4Y",
      polygonMumbai: "W9TVEYKW2CDTQ94T3A2V93IX6U3IHQN5Y3",
      "base-goerli": "PLACEHOLDER_STRING",
      base: "F9E5R4E8HIJQZMRE9U9IZMP7NVZ2IAXNB8",
    },
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
  solidity: "0.8.17",
};

export default config;
