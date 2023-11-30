import UnlockedDay from "./UnlockedDay";
import LoadingDay from "./LoadingDay";
import BaseDay from "./BaseDay";
import FutureDay from "./FutureDay";
import { useBalance, useContractWrite, usePrepareContractWrite } from 'wagmi'
import contracts from "../lib/contracts";
import { useContractReads } from "wagmi";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { LocksmithService } from "@unlock-protocol/unlock-js";
import { useWaitForTransaction } from 'wagmi'



interface MintableProps {
  user: string;
  day: number;
  lock: string;
  network: number
  onMinting: (hash:string) => void
}

// There should only be one!
const Mintable = ({user, lock, network, day, onMinting}: MintableProps) => {
  const {wallets} = useWallets();
  const { signMessage } = usePrivy();
  const [hash,] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const { data: userBalance, isLoading: isBalanceLoading } = useBalance({
    address: user as `0x${string}`,
  })

  // Switch network if required
  useEffect(() => {
    if(wallets[0] && wallets[0].chainId !== `eip155:${network}}`) {
      wallets[0].switchChain(network)
    }
  }, [wallets, network])

  const {config, error} = usePrepareContractWrite({
    address: lock as `0x${string}`,
    abi: contracts.lock.ABI,
    functionName: 'purchase',
    chainId: network,
    args: [[0], [user], [user], [user], ['']],
  })
  
  const { writeAsync } = useContractWrite({
    ...config,
  })
  
  const checkout = async () => {
    try {
      if (userBalance && userBalance?.value > 0) {
        setLoading(true)
        const {hash} = await writeAsync!()
        onMinting(hash)
      } else {
        const service = new LocksmithService();
        const siwe = LocksmithService.createSiweMessage({
          domain: 'unlock-protocol.com',
          uri: 'https://unlock-protocol.com',
          address: user,
          chainId: network,
          version: '1',
        });
        const message = siwe.prepareMessage();

        const signature = await signMessage(message, {
          title: 'Authenticate with Unlock',
          description: 'Please sign this message to claim this NFT for free!',
          buttonText: 'Sign'
        });
        setLoading(true)
        const loginResponse = await service.login({
          message,
          signature,
        });
        const { accessToken } = loginResponse.data;
        const response = await service.claim(network, lock, '', {
          recipient: user,
          data: '',
        }, 
        user,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        onMinting(response.data.transactionHash)
      }        
    } catch (error) {
      console.error(error)
      return false
    }
    setLoading(false)
  };

  if (loading) {
    return <LoadingDay day={day} />;
  }

  return (
    <BaseDay outterClasses="bg-white border-none cursor-pointer" onClick={checkout} day={day} />
  );

}

interface UnlockableDayProps {
  user: string;
  day: number;
  lock: string;
  previousDayLock?: string | null;
  network: number
}

const UnlockableDay = ({ user, day, lock, previousDayLock, network }: UnlockableDayProps) => {
  const [hash, setHash] = useState('');
  
  
  const contractReads = [{
      address: lock as `0x${string}`,
      abi: contracts.lock.ABI,
    functionName: "getHasValidKey",
    chainId: contracts.hook.network,
    args: [user],
  }]
  if(day >1) {
    contractReads.push({
      address: previousDayLock as `0x${string}`,
      abi: contracts.lock.ABI,
      functionName: "getHasValidKey",
      chainId: contracts.hook.network,
      args: [user],
    })
  }
  
  const {
    data: memberships,
    isLoading: membershipsLoading,
  } = useContractReads({
    watch: true,
    // @ts-expect-error
    contracts: contractReads
  });

  const { data } = useWaitForTransaction({
    chainId: contracts.hook.network,
    hash: hash as `0x${string}`,
    enabled: !!hash
  })


  const isLoading = membershipsLoading || (hash && !data)
  const [hasMembership, previousDayMembership] = memberships || []

  if (isLoading) {
    return <LoadingDay day={day} />;
  }

  if (!previousDayMembership?.result && day > 1) {
    return <FutureDay day={day} />;
  }

  if (hasMembership?.result) {
    return <UnlockedDay justUnlocked={data?.status == 'success'} user={user} day={day} />;
  }

  return (
    <Mintable onMinting={(hash: string) => {
      setHash(hash)
    }} user={user} lock={lock} network={network} day={day}/>
  );
};

export default UnlockableDay;
