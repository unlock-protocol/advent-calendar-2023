import { useBalance } from "wagmi";
import { useAuth } from "../hooks/useAuth";
import contracts from "../lib/contracts";

export const GetTokens = () => {
  // Check the user's balance. 
  // If it is 0 on Base but > 0 on 
  const { user, wallet } = useAuth();
  const { data: userBalanceOnMainnet } = useBalance({
    address: wallet?.address as `0x${string}`,
    chainId: 1
  })
  const { data: userBalanceOnNetwork } = useBalance({
    address: wallet?.address as `0x${string}`,
    chainId: contracts.network,
  })
  console.log({userBalanceOnMainnet, userBalanceOnNetwork})
  const isPrivyUser = !user || user.wallet?.walletClientType === 'privy'
  
  if (isPrivyUser) {
    return false
  }


  return <div className="text-center flex flex-col bg-white">
    Get tokens!
  </div>
}