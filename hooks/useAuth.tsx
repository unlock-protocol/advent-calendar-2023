import { usePrivy, useWallets } from "@privy-io/react-auth";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { useEffect } from "react";

export function useAuth() {
  const { linkEmail, user, login, logout } = usePrivy();
  const { wallet, setActiveWallet } = usePrivyWagmi();
  const { wallets } = useWallets();


  useEffect(() => {
    if(user) {
      if (!user?.wallet?.address) {
        // We have no wallet for that user. What can we do?
        console.error("No wallet for user!")
      } else {
        // We have a wallet address. Let's ensure that the connected wallet matches it!
        if(user?.wallet?.address !== wallet?.address) {
          let found = false
          // If not, circle thru until we find the right one!
          wallets.forEach((w) => {
            if (w.address === user?.wallet?.address) {
              found = true
              setActiveWallet(w)
            }
          })
          if(!found) {
            console.error("No wallet matches the user's wallet!")
            // We have a user that is connected but no matching wallet. What do we do?
          }
        } else {
          // All good, user connected to the right wallet!
        }
      }
    } else {
      // No privy user. If we have a wallet, disconnect it
      if (wallet) {
        // Disconnect any wallet!
        setActiveWallet(undefined)
      } else {
        // No wallet, no user. All good!
      }
    }
  }, [wallet, user, wallets])


  useEffect(() => {
    if (user && !user?.email) {
      if (user?.google?.email) {
        console.log("We have a google email but not user email!")
      } else {
        linkEmail();
      }
    }
  }, [user])

  return {linkEmail, user, login, logout, wallet}
}
