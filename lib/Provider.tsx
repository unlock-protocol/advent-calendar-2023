import {PrivyProvider} from '@privy-io/react-auth';
import { configureChainsConfig, wagmiClient } from "./wagmi";
import { ConnectKitProvider } from "connectkit";
import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { queryClient } from "./reactQuery";
import { DefaultSeo } from "next-seo";
import { DEFAULT_SEO } from "./seo";
import { useRouter } from "next/router";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";

export const Provider = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const seo = { ...DEFAULT_SEO };

  if (
    router.query.day &&
    seo?.openGraph?.images &&
    seo?.openGraph?.images.length > 0
  ) {
    seo.openGraph.images[0].url = ``;
  }

  return (
    <QueryClientProvider client={queryClient}>
          <PrivyProvider appId="clpjz90qo00k2if0fl2coy0ns" onSuccess={() => console.log('Success!')}>
          <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>

          <DefaultSeo {...seo} />
          {children}
          </PrivyWagmiConnector>

          </PrivyProvider>

    </QueryClientProvider>
  );
};

export default Provider;
