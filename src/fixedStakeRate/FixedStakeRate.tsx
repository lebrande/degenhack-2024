import { Button, Card, CardBody, CardHeader, Heading, Stack, StackDivider } from "@chakra-ui/react";
import { DepositControl } from "./DepositControl";
import { useOpenFixedStakeRatePosition } from "../hooks/useOpenFixedStakeRatePosition";
import { useState } from "react";
import { parseEther } from "viem";

export const FixedStakeRate = () => {
  const [depositAmount, setDepositAmount] = useState(0);
  const {
    execute,
    hash,
    isPending,
    isConfirmed,
    isConfirming,
    error,
  } = useOpenFixedStakeRatePosition({
    depositAmount: parseEther(depositAmount.toString()),
  });

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Fixed Rate Leveraged Staking</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <DepositControl
            depositAmount={depositAmount}
            setDepositAmount={setDepositAmount}
          />
          <Button
            isLoading={isPending}
            colorScheme='blue'
            onClick={execute}
          >
            {isPending ? 'Confirming...' : 'Open position'}
          </Button>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
            <div>Error: {error.shortMessage || error.message}</div>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};