import { formatEther } from 'viem';
import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import { useWEthBalance } from '../hooks/useWEthBalance';
import { useWstWEthBalance } from '../hooks/useWstWEthBalance';
import { FIXED_STAKE_RATE_ADDRESS } from '../contracts/FixedStakeRate';

export const Account = () => {
  const wEthBalance = useWEthBalance(FIXED_STAKE_RATE_ADDRESS);
  const wstEthBalance = useWstWEthBalance(FIXED_STAKE_RATE_ADDRESS);

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Account</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Addresses:
            </Heading>
            <Text pt='2' fontSize='sm'>
              {FIXED_STAKE_RATE_ADDRESS}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              WETH
            </Heading>
            <Text pt='2' fontSize='sm'>
              {formatEther(wEthBalance.data || 0n)}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              wstETH
            </Heading>
            <Text pt='2' fontSize='sm'>
              {formatEther(wstEthBalance.data || 0n)}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};