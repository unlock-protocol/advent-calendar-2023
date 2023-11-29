import { wagmiClient } from "./wagmi";
import { WagmiConfig } from "wagmi";
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
      <WagmiConfig config={wagmiClient}>
        <ConnectKitProvider
          theme="midnight"
          options={{
            embedGoogleFonts: true,
          }}
        >
          <DefaultSeo {...seo} />
          {children}
        </ConnectKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
};

export default Provider;
