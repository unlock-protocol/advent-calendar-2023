import UnlockedDay from "./UnlockedDay";
import LoadingDay from "./LoadingDay";
import BaseDay from "./BaseDay";
import FutureDay from "./FutureDay";
import { useBalance, useContractWrite, usePrepareContractWrite } from 'wagmi'
import contracts from "../lib/contracts";
import { useContractReads } from "wagmi";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useRef, useState } from "react";
import { LocksmithService } from "@unlock-protocol/unlock-js";
import { useWaitForTransaction } from 'wagmi'
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { AppConfig } from "../lib/AppConfig";
import ReCaptcha from 'react-google-recaptcha'

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
  const [loading, setLoading] = useState<boolean>(false)
  const {wallet: activeWallet} = usePrivyWagmi();
  const recaptchaRef = useRef<any>()


  const { data: userBalance, isLoading: isBalanceLoading } = useBalance({
    address: user as `0x${string}`,
  })

  // Switch network if required
  useEffect(() => {
    if(wallets[0] && wallets[0].chainId !== `eip155:${network}}`) {
      wallets[0].switchChain(network)
    }
  }, [wallets, network])

  const {config} = usePrepareContractWrite({
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
      if (userBalance && userBalance?.value > 0.0000001) {
        setLoading(true)
        const {hash} = await writeAsync!()
        onMinting(hash)
      } else {
        await recaptchaRef.current?.reset()
        const captcha = await recaptchaRef.current?.executeAsync()
        const service = new LocksmithService();
        const siwe = LocksmithService.createSiweMessage({
          domain: window.location.host,
          uri: window.location.origin,
          address: user,
          chainId: network,
          version: '1',
          statement: "I'd like to mint an NFT from the Unlock Protocol Advent Calendar!"
        });
        const message = siwe.prepareMessage();
        const ethersProvider = await activeWallet?.getEthersProvider()
        if(!ethersProvider) {
          console.error('No ethers provider')
          return
        }
        const ethersSigner = await ethersProvider.getSigner()
        const signature = await ethersSigner.signMessage(message);
        setLoading(true)
        const loginResponse = await service.login({
          message,
          signature,
        });
        const { accessToken } = loginResponse.data;
        const response = await service.claim(network, lock, captcha, {
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

  if (loading || !writeAsync) {
    return <LoadingDay day={day} />;
  }

  return (
    <>
          <ReCaptcha
        ref={recaptchaRef}
        sitekey={AppConfig.recaptchaKey}
        size="invisible"
        badge="bottomleft"
      />
    <BaseDay outterClasses="bg-white border-none cursor-pointer" onClick={checkout} day={day} />
    </>
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
    chainId: contracts.network,
    args: [user],
  }]
  if(day >1) {
    contractReads.push({
      address: previousDayLock as `0x${string}`,
      abi: contracts.lock.ABI,
      functionName: "getHasValidKey",
      chainId: contracts.network,
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
    chainId: contracts.network,
    hash: hash as `0x${string}`,
    enabled: !!hash
  })


  const justUnlocked = data?.status == 'success' 



  const isLoading = membershipsLoading || (hash && !data)
  const [hasMembership, previousDayMembership] = memberships || []

  if (isLoading) {
    return <LoadingDay day={day} />;
  }

  if (!previousDayMembership?.result && day > 1) {
    return <FutureDay day={day} />;
  }

  if (hasMembership?.result) {
    return <UnlockedDay justUnlocked={justUnlocked} user={user} day={day} />;
  }


  return (
    <Mintable onMinting={(hash: string) => {
      setHash(hash)
    }} user={user} lock={lock} network={network} day={day}/>
  );
};

export default UnlockableDay;
