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
import Link from "next/link";

interface MintableProps {
  day: number;
  lock: string;
  network: number
  onMinting: (hash:string) => void
}

const explorer = (network: number, hash: string) => {
  if (network === 5) {
    return `https://goerli.etherscan.io/tx/${hash}`
  }
  return `https://basescan.org/tx/${hash}`
}

const Mintable = ({lock, network, day, onMinting}: MintableProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { wallet, canClaim } = useAuth();
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
          const explorerLink = explorer(network, hash)
          toast.success(<p>Your <Link className="inline underline" target="_blank" href={explorerLink}>NFT is being minted</Link>! Please stand by!</p>, {duration: 10000})
          
          onMinting(hash)
        } catch(e) {
          console.error(e)
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
          signature = await ethersSigner.signMessage(message);
        } catch (error) {
          toast.error("Please make sure you sign this message to confirm you want to open today's gift!")
          setLoading(false)
          return
        }
        setLoading(true)
        if (!canClaim) {
          // Block spammers who can't claim here...
          toast.success("Your NFT is being minted! Please stand by!", {duration: 10000})
          return false
        }
        const loginResponse = await service.login({
          message,
          signature,
        });
        const { accessToken } = loginResponse.data;
        const response = await service.claim(network, lock, captcha, {
          recipient: wallet?.address,
          data: '',
          referrer: referrer as string || '0x0000000000000000000000000000000000000000'
        }, 
        wallet?.address,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const hash = response.data.transactionHash

        const explorerLink = explorer(network, hash)
        toast.success(<p>Your <Link className="inline underline" target="_blank" href={explorerLink}>NFT is being minted</Link>! Please stand by!</p>, {duration: 10000})
        onMinting(hash)
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
  network: number
  hasPreviousDayMembership?: boolean;
  hasMembership?: boolean;
  refetch: any
}

const UnlockableDay = ({ refetch, user, day, lock, hasMembership, hasPreviousDayMembership, network }: UnlockableDayProps) => {
  const [hash, setHash] = useState('');

  
  const { data } = useWaitForTransaction({
    chainId: contracts.network,
    hash: hash as `0x${string}`,
    enabled: !!hash,
    onSuccess() {
      refetch();
    }
  })

  const justUnlocked = data?.status == 'success' 
  const isLoading = (hash && !data)

  if (isLoading) {
    return <LoadingDay day={day} />;
  }

  if (!hasPreviousDayMembership && day > 1) {
    return <FutureDay day={day} />;
  }

  if (hasMembership) {
    return <UnlockedDay lock={lock} network={network} justUnlocked={justUnlocked} user={user} day={day} />;
  }

  return (
    <Mintable onMinting={(hash: string) => {
      setHash(hash)
    }} lock={lock} network={network} day={day} />
  );
};

export default UnlockableDay;
