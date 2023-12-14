import { networks } from "@unlock-protocol/networks";
import { Chain } from "wagmi";
import {configureChains} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import contracts from "./contracts";

const chains = Object.values(networks)
  .map((item: any) => {
    let provider = item.provider
    if (item.id === 8453) {
      if (Math.floor(Math.random() * 2) == 0) {
        console.log('Using Alchemy')
        provider = "https://base-mainnet.g.alchemy.com/v2/0BFiBg_uzdW2aZjykG9ECDEe_ay32cpe"
      } else {
        console.log('Using Unlock\'s')
      }
    }
    return {
      id: item?.id,
      rpcUrls: {
        default: {
          http: [provider],
        },
        public: {
          http: [provider],
        },
      },
      name: item.name,
      testnet: item.isTestNetwork,
      blockExplorers: {
        default: item?.explorer?.base,
      },
      nativeCurrency: item.nativeCurrency,
      network: item.network,
    } as Chain;
  })
  .filter((chain) => {
    return chain.id == 1 || chain.id === contracts.network;
  });

  console.log(chains)

export const configureChainsConfig = configureChains(chains, [publicProvider()]);

