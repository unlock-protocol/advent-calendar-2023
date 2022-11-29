import { useRouter } from "next/router";
import { useEffect, useMemo, useCallback, useState } from "react";
import { ethers } from "ethers";

export function useLock(address: string, day: number) {
  if (day < 3) {
    return {
      hasMembership: true,
      loading: false
    };
  }
  return {
    hasMembership: false,
    loading: false
  };
}
