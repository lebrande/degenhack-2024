import { Button, Card, CardBody, CardHeader, Heading, Stack, StackDivider } from "@chakra-ui/react";
import { dev_useRevertSwap } from "../hooks/dev_useRevertSwap";

export const RevertSwap = () => {
  const {
    execute,
    hash,
    isPending,
    isConfirmed,
    isConfirming,
    error,
  } = dev_useRevertSwap();

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Revert Swap (dev)</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
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