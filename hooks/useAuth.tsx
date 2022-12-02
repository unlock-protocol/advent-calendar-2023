import { useRouter } from "next/router";
import { useEffect, useMemo, useCallback, useState } from "react";
import { ethers } from "ethers";
import useLocalStorageState from "use-local-storage-state";

export function useAuth() {
  const router = useRouter();
  const code = router.query?.code?.toString();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [user, setUser] = useLocalStorageState("user", {
    defaultValue: "",
  });

  const isAuthenticated = !!user;

  const authenticate = useCallback(
    async (_code: string) => {
      const code = JSON.parse(Buffer.from(_code, "base64").toString());
      const message = code.d;
      const signature = code.s;
      const user = ethers.utils.verifyMessage(message, signature);

      setUser(user);

      return {
        message,
        signature,
        user,
      };
    },
    [setUser]
  );

  useEffect(() => {
    if (!code) {
      return;
    }
    const onCode = async () => {
      setIsAuthenticating(true);
      try {
        // We just need to remove the code!
        const url = new URL(window.location.toString());
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        router.replace(url.toString(), undefined, {
          shallow: true,
        });
        await authenticate(code);
      } catch (error) {
        console.error(error);
      }
      setIsAuthenticating(false);
    };
    onCode();
  }, [router, code, authenticate]);

  interface LoginParams {
    [key: string]: string;
  }

  interface PurchaseParams {
    [key: string]: string;
  }

  const login = (params: LoginParams = {}) => {
    const url = new URL("https://app.unlock-protocol.com/checkout");
    url.searchParams.set("client_id", window.location.host);
    const redirectUri = new URL(window.location.href);
    Object.keys(params).forEach((key) => {
      redirectUri.searchParams.set(key, params[key]);
    });
    url.searchParams.set("redirect_uri", redirectUri.toString());
    window.location.href = url.toString();
  };

  const logout = () => {
    setUser("");
  };

  const purchase = (paywallConfig = {}, params: PurchaseParams = {}) => {
    const url = new URL("https://app.unlock-protocol.com/checkout");
    const redirectUri = new URL(window.location.href);
    Object.keys(params).forEach((key) => {
      redirectUri.searchParams.set(key, params[key]);
    });

    url.searchParams.set("redirectUri", redirectUri.toString());
    url.searchParams.set("paywallConfig", JSON.stringify(paywallConfig));
    window.location.href = url.toString();
  };

  return {
    user,
    login,
    logout,
    isAuthenticated,
    isAuthenticating,
    purchase,
  };
}
