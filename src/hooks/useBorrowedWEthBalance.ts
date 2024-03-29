import { AaveV3Ethereum } from "@bgd-labs/aave-address-book";
import { Address, erc20Abi } from "viem";
import { useReadContract } from "wagmi";

export const useBorrowedWEthBalance = (accountAddress: Address) => {
  const wEthBalance = useReadContract({
    abi: erc20Abi,
    functionName: 'balanceOf',
    address: AaveV3Ethereum.ASSETS.WETH.V_TOKEN,
    args: [accountAddress],
  });

  return wEthBalance;
}