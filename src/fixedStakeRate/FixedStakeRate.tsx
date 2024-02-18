import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { Account } from "./Account";
import { OpenFixedStakeRatePosition } from "./OpenFixedStakeRatePosition";
import { ApproveDebtDelegation } from "./ApproveDebtDelegation";
import { Address } from "viem";
import { FIXED_STAKE_RATE_ADDRESS } from "../contracts/FixedStakeRate";
import { RevertSwap } from "../dev_revertSwap/RevertSwap";
import { ApproveOpenPosition } from "./ApproveOpenPosition";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface Props {
  goToDashboard: () => void;
}

export const FixedStakeRate = ({
  goToDashboard,
}: Props) => {
  const { address: accountAddress } = useAccount();

  return (
    <Box maxW="60rem" mx="auto" py="4rem">
      <Button onClick={goToDashboard} mb={'2rem'}>
        Go to dashboard
      </Button>
      {accountAddress && (
        <Form accountAddress={accountAddress} />
      )}
      {!accountAddress && (
        <ConnectButton />
      )}
    </Box>
  );
};

interface FormProps {
  accountAddress: Address;
}

const Form = ({
  accountAddress,
}: FormProps) => {
  return (
    <SimpleGrid columns={2} spacing={10}>
      {/* <Account
        accountAddress={FIXED_STAKE_RATE_ADDRESS}
        title="Contract balances"
      /> */}
      <Account
        accountAddress={accountAddress}
        title="Wallet balances"
      />
      <Box>
        <ApproveOpenPosition />
        <ApproveDebtDelegation />
        <OpenFixedStakeRatePosition accountAddress={accountAddress} />
      </Box>
      {/* <RevertSwap /> */}
    </SimpleGrid>
  );
}