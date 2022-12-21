import { ethers } from "ethers";

export const isWinner = async (address: string) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.unlock-protocol.com/137"
  );
  const hook = new ethers.Contract(
    "0x5511f75b370e67846fc5fa1a814588986552aad3",
    [
      {
        inputs: [],
        name: "winner1",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "winner2",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "winner3",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    provider
  );
  const winners = await Promise.all([
    hook.winner1(),
    hook.winner2(),
    hook.winner3(),
  ]);
  return winners
    .map((w: string) => w.toLowerCase())
    .indexOf(address.toLowerCase());
};

export default isWinner;
