import { toast } from "react-hot-toast";
import UnlockedDay from "./UnlockedDay";
import LoadingDay from "./LoadingDay";
import BaseDay from "./BaseDay";
import FutureDay from "./FutureDay";
import { useBalance, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import contracts from "../lib/contracts";
import { useContractReads } from "wagmi";
import { useEffect, useRef, useState } from "react";
import { LocksmithService } from "@unlock-protocol/unlock-js";
import { useWaitForTransaction } from 'wagmi'
import { AppConfig } from "../lib/AppConfig";
import ReCaptcha from 'react-google-recaptcha'
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

interface MintableProps {
  day: number;
  lock: string;
  network: number
  onMinting: (hash:string) => void
}

const Mintable = ({lock, network, day, onMinting}: MintableProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { wallet } = useAuth();
  const recaptchaRef = useRef<any>()
  const {query} = useRouter()

  const {data: referrer} = useContractRead({
    address: lock as `0x${string}`,
    abi: contracts.lock.ABI,
    functionName: "ownerOf",
    chainId: contracts.network,
    args: [query?.r],
    enabled: !!(lock && query?.d === day.toString() && query?.r)
  })

  console.log({referrer})

  const { data: userBalance } = useBalance({
    address: wallet?.address as `0x${string}`,
  })

  // Switch network if required
  useEffect(() => {
    if(wallet && wallet.chainId !== `eip155:${network}}`) {
      wallet.switchChain(network)
    }
  }, [wallet, network])

  const {config} = usePrepareContractWrite({
    address: lock as `0x${string}`,
    abi: contracts.lock.ABI,
    functionName: 'purchase',
    chainId: network,
    account: wallet?.address as `0x${string}`,
    args: [[0], [wallet?.address], [referrer || '0x0000000000000000000000000000000000000000'], [wallet?.address], ['']],
    gas: BigInt(700_000), // This is high, just in case they win!
  })
  
  const { writeAsync } = useContractWrite({
    ...config,
  })
  
  const checkout = async () => {
    try {
      if (userBalance && userBalance?.value > 0.0000001) {
        setLoading(true)
        try {
          const {hash} = await writeAsync!()
          toast.success("Your NFT is being minted! Please stand by!", {duration: 10000})
          onMinting(hash)
        } catch(e) {
          toast.error("It looks like the transaction to mint today\'s NFT could not be submitted! Please try again!")
        }
      } else {
        await recaptchaRef.current?.reset()
        const captcha = await recaptchaRef.current?.executeAsync()
        const service = new LocksmithService();
        const siwe = LocksmithService.createSiweMessage({
          domain: window.location.host,
          uri: window.location.origin,
          address: wallet?.address,
          chainId: network,
          version: '1',
          statement: "I'd like to mint an NFT from the Unlock Protocol Advent Calendar!"
        });
        const message = siwe.prepareMessage();
        const ethersProvider = await wallet?.getEthersProvider()
        if(!ethersProvider) {
          console.error('No ethers provider')
          return
        }
        const ethersSigner = await ethersProvider.getSigner()
        let signature
        try {
          toast.error("Please sign the message in your wallet!")
          signature = await ethersSigner.signMessage(message);
        } catch (error) {
          toast.error("Please make sure you sign this message to confirm you want to open today's gift!")
          setLoading(false)
          return
        }
        setLoading(true)
        const loginResponse = await service.login({
          message,
          signature,
        });
        const { accessToken } = loginResponse.data;
        const response = await service.claim(network, lock, captcha, {
          recipient: wallet?.address,
          data: '',
        }, 
        wallet?.address,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        toast.success("Your NFT is being minted! Please stand by!", {duration: 10000})
        onMinting(response.data.transactionHash)
      }        
    } catch (error) {
      toast.error("There was an error minting your NFT. Please refresh the page and try again!")
      setLoading(false)
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
    return <UnlockedDay lock={lock} network={network} justUnlocked={justUnlocked} user={user} day={day} />;
  }

  return (
    <Mintable onMinting={(hash: string) => {
      setHash(hash)
    }} lock={lock} network={network} day={day} />
  );
};

export default UnlockableDay;
