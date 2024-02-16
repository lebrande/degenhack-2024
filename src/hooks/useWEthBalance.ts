import { Address, erc20Abi } from "viem";
import { useReadContract } from "wagmi";
import { WETH_ADDRESS } from "../contracts/WETH";

export const useWEthBalance = (accountAddress: Address) => {
  const wEthBalance = useReadContract({
    abi: erc20Abi,
    functionName: 'balanceOf',
    address: WETH_ADDRESS,
    args: [accountAddress],
  });

  return wEthBalance;
}