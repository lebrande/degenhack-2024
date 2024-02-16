import { Button, Card, CardBody, CardHeader, Heading, Stack, StackDivider } from "@chakra-ui/react";
import { DepositControl } from "./DepositControl";
import { openFixedStakeRatePosition } from "../hooks/openFixedStakeRatePosition";
import { useState } from "react";
import { parseEther } from "viem";

export const FixedStakeRate = () => {
  const [depositAmount, setDepositAmount] = useState(0);
  const { execute } = openFixedStakeRatePosition({
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
            colorScheme='blue'
            onClick={execute}
          >
            Open position
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};