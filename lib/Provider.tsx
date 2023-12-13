import {PrivyProvider} from '@privy-io/react-auth';

import { configureChainsConfig } from "./wagmi";
import { ReactNode } from "react";
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "react-hot-toast";

import { queryClient } from "./reactQuery";
import { DefaultSeo } from "next-seo";
import { DEFAULT_SEO } from "./seo";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import * as RadixToolTip from "@radix-ui/react-tooltip";

export const Provider = ({ children }: { children?: ReactNode }) => {
  const seo = { ...DEFAULT_SEO };

  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider appId="clpjz90qo00k2if0fl2coy0ns" config={{
        embeddedWallets: {
          noPromptOnSignature: true // defaults to false
        }
      }}>
        <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
          <DefaultSeo {...seo} />
          <RadixToolTip.Provider delayDuration={100}>
          {children}
          <Toaster
              toastOptions={{
                style: {
                  background: "white",
                  color: "black",
                },
              }}
            />
          </RadixToolTip.Provider>
        </PrivyWagmiConnector>
      </PrivyProvider>
    </QueryClientProvider>
  );
};

export default Provider;
