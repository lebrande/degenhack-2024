import { useWriteContract } from "wagmi";
import FixedStakeRate from '../../protocol/artifacts/contracts/FixedStakeRate.sol/FixedStakeRate.json'
import { FIXED_STAKE_RATE_ADDRESS } from "../contracts/FixedStakeRate";
import { WSTETH_ADDRESS } from "../contracts/wstETH";

interface Args {
  depositAmount: bigint;
}

export const openFixedStakeRatePosition = ({
  depositAmount,
}: Args) => {
  const { writeContract } = useWriteContract();

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
  };
}