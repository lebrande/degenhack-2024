import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import FixedStakeRate from '../../protocol/artifacts/contracts/FixedStakeRate.sol/FixedStakeRate.json'
import { FIXED_STAKE_RATE_ADDRESS } from "../contracts/FixedStakeRate";
import { WSTETH_ADDRESS } from "../contracts/wstETH";

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
      functionName: 'requestFlashLoan',
      args: [
        WSTETH_ADDRESS,
        depositAmount,
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