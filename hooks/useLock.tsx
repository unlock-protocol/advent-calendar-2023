import { useRouter } from "next/router";
import { useEffect, useMemo, useCallback, useState } from "react";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import days from "../lib/days";

export function useLock(address: string, day: number) {
  const query = useQuery({
    queryKey: ["key", day, address], 
    queryFn: async () => {
      if (day === 0) {
        return true;
      }
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.unlock-protocol.com/137"
      );

      const lock = new ethers.Contract(
        days[day - 1].lock,
        [
          {
            inputs: [
              { internalType: "address", name: "_keyOwner", type: "address" },
            ],
            name: "getHasValidKey",
            outputs: [{ internalType: "bool", name: "isValid", type: "bool" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        provider
      );
      return await lock.getHasValidKey(address);
    }
  });

  return {
    hasMembership: query.data,
    isLoading: query.isLoading,
  };
}
