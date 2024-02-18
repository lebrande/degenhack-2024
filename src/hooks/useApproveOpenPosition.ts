import { erc20Abi } from "viem";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WSTETH_ADDRESS } from "../contracts/wstETH";
import { FIXED_STAKE_RATE_ADDRESS } from "../contracts/FixedStakeRate";

export const useApproveOpenPosition = (amount: bigint) => {
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
      abi: erc20Abi,
      address: WSTETH_ADDRESS,
      functionName: 'approve',
      args: [
        FIXED_STAKE_RATE_ADDRESS,
        amount,
      ],
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