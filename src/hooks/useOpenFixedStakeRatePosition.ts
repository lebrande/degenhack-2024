import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import FixedStakeRate from '../abi/FixedStakeRate.json';
import { FIXED_STAKE_RATE_ADDRESS } from "../contracts/FixedStakeRate";
import { useRiskIndicatorsInputs } from "../openSwapRiskIndicators/useRiskIndicatorsInputs";
import { STETH_ADDRESS } from "../contracts/stETH";

interface Args {
  depositAmount: bigint;
}

export const useOpenFixedStakeRatePosition = ({
  depositAmount,
}: Args) => {
  const riskIndicatorsInputs = useRiskIndicatorsInputs({
    assetAddress: STETH_ADDRESS,
    // direction should be receiveFixed
    // only to POC that IPOR smart contracts work
    // receiveFixed is not available due to high demand 
    // and no liquidity in the pool
    // direction: 'receiveFixed',
    direction: 'payFixed', 
    tenor: 'days28',
  });
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
    if (riskIndicatorsInputs === undefined) {
      throw new Error('riskIndicatorsInputs is undefined');
    }

    writeContract({
      abi: FixedStakeRate.abi,
      address: FIXED_STAKE_RATE_ADDRESS,
      functionName: 'openPosition',
      args: [depositAmount, riskIndicatorsInputs],
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