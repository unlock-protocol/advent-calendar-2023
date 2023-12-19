import { useBalance } from "wagmi";
import { useAuth } from "../hooks/useAuth";
import contracts from "../lib/contracts";
import Link from "next/link";

export const GetTokens = () => {
  return <div className="align-center text-center flex flex-row h-8 my-4 align-middle justify-center">
    <GetTokensButton />
  </div>
}

const GetTokensButton = () => {
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
  
  const minAmountRequired = BigInt(400_000_000_000_000) // about 1$
  if(!userBalanceOnNetwork || userBalanceOnNetwork?.value > minAmountRequired) {
    // Enough coins on the network? No need to bridge!
    return false
  }

  if(!userBalanceOnMainnet || userBalanceOnMainnet?.value < minAmountRequired * BigInt(5)) {
    // No coins on Ethereum mainet? No bridge!
    return false
  }

  return <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center" target="_blank" href='https://bridge.base.org/deposit'>Bridge Tokens</Link>
}