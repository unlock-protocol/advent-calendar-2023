import { networks } from "@unlock-protocol/networks";
import { Chain, createConfig } from "wagmi";
import { AppConfig } from "./AppConfig";
import { getDefaultConfig } from "connectkit";
import contracts from "./contracts";

const chains = Object.values(networks)
  .map((item: any) => {
    return {
      id: item?.id,
      rpcUrls: {
        default: {
          http: [item?.provider],
        },
        public: {
          http: [item?.publicProvider],
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
    return chain.id === 5;
  });

export const wagmiClient = createConfig(
  getDefaultConfig({
    walletConnectProjectId: "ec0bdd791292ffb9b7ec3cfa84469948",
    chains,
    autoConnect: true,
    appName: AppConfig.name,
    appDescription: AppConfig.description,
    appUrl: AppConfig.siteUrl,
  }),
);
