import { networks } from "@unlock-protocol/networks";
import { Chain } from "wagmi";
import {configureChains} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';

const chains = Object.values(networks)
  .map((item: any) => {
    return {
      id: item?.id,
      rpcUrls: {
        default: {
          http: [item?.provider],
        },
        public: {
          http: [item?.provider],
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
    return chain.id === 8453;
  });

export const configureChainsConfig = configureChains(chains, [publicProvider()]);

