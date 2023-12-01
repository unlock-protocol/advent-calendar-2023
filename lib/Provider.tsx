import {PrivyProvider} from '@privy-io/react-auth';

import { configureChainsConfig } from "./wagmi";
import { ReactNode } from "react";
import {
  QueryClientProvider,
} from '@tanstack/react-query'

import { queryClient } from "./reactQuery";
import { DefaultSeo } from "next-seo";
import { DEFAULT_SEO } from "./seo";
import { useRouter } from "next/router";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";

export const Provider = ({ children }: { children?: ReactNode }) => {
  const seo = { ...DEFAULT_SEO };

  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider appId="clpjz90qo00k2if0fl2coy0ns">
        <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
          <DefaultSeo {...seo} />
          {children}
        </PrivyWagmiConnector>
      </PrivyProvider>
    </QueryClientProvider>
  );
};

export default Provider;
