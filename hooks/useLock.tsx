import { useRouter } from "next/router";
import { useEffect, useMemo, useCallback, useState } from "react";
import { ethers } from "ethers";

export function useLock(address: string, day: number) {
  const [loading, setLoading] = useState(true);
  const [hasMembership, setHasMembership] = useState(true);

  // UseQuery!
  useEffect(() => {
    if (day === 0) {
      setLoading(false);
      return setHasMembership(true);
    }
    console.log(`Check ${address} for ${day}`);
    setLoading(false);
    setHasMembership(false);
  }, [address, day]);

  return {
    hasMembership,
    loading,
  };
}
