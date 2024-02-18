import { Button, Card, CardBody, CardHeader, Heading, Stack, StackDivider } from "@chakra-ui/react";
import { useApproveDebtDelegation } from "../hooks/useApproveDebtDelegation";

export const ApproveDebtDelegation = () => {
  const {
    execute,
    hash,
    isPending,
    isConfirmed,
    isConfirming,
    error,
  } = useApproveDebtDelegation();

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Approve Debt Delegation</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Button
            isLoading={isPending}
            colorScheme='blue'
            onClick={execute}
          >
            {isPending ? 'Confirming...' : 'Approve delegation'}
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