import { Address, erc20Abi } from "viem";
import { useReadContract } from "wagmi";
import { WSTETH_ADDRESS } from "../contracts/wstETH";

export const useWstWEthBalance = (accountAddress: Address) => {
  const wEthBalance = useReadContract({
    abi: erc20Abi,
    functionName: 'balanceOf',
    address: WSTETH_ADDRESS,
    args: [accountAddress],
  });

  return wEthBalance;
}