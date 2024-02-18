import { Button, Card, CardBody, CardHeader, Heading, Stack, StackDivider } from "@chakra-ui/react";
import { useApproveOpenPosition } from "../hooks/useApproveOpenPosition";
import { parseEther } from "viem";

export const ApproveOpenPosition = () => {
  const {
    execute,
    hash,
    isPending,
    isConfirmed,
    isConfirming,
    error,
  } = useApproveOpenPosition(parseEther('99999999999999'));

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Approve Open Position</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Button
            isLoading={isPending}
            colorScheme='blue'
            onClick={execute}
          >
            {isPending ? 'Confirming...' : 'Approve'}
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