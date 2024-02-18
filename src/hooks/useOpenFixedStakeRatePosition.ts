import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import FixedStakeRate from '../abi/FixedStakeRate.json';
import { FIXED_STAKE_RATE_ADDRESS } from "../contracts/FixedStakeRate";

interface Args {
  depositAmount: bigint;
}

export const useOpenFixedStakeRatePosition = ({
  depositAmount,
}: Args) => {
  const {
    data: hash,
    writeContract,
    isPending,
    error,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed
  } = useWaitForTransactionReceipt({
    hash,
  });

  const execute = () => {
    writeContract({
      abi: FixedStakeRate.abi,
      address: FIXED_STAKE_RATE_ADDRESS,
      functionName: 'openPosition',
      args: [depositAmount],
    });
  }

  return {
    execute,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error: error as BaseError,
  };
}