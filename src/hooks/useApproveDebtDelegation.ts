import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { FIXED_STAKE_RATE_ADDRESS } from "../contracts/FixedStakeRate";
import { AaveV3Ethereum } from "@bgd-labs/aave-address-book";
import { parseEther } from "viem";

export const useApproveDebtDelegation = () => {
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
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "delegatee",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approveDelegation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      // address: AaveV3Ethereum.ASSETS.wstETH.V_TOKEN,
      address: AaveV3Ethereum.ASSETS.WETH.V_TOKEN,
      functionName: 'approveDelegation',
      args: [
        FIXED_STAKE_RATE_ADDRESS,
        parseEther('999999999'),
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