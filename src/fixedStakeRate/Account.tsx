import { Address, formatEther } from 'viem';
import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import { useWEthBalance } from '../hooks/useWEthBalance';
import { useWstWEthBalance } from '../hooks/useWstWEthBalance';
import { useSuppliedWstEthBalance } from '../hooks/useSuppliedWstEthBalance';
import { useBorrowedWEthBalance } from '../hooks/useBorrowedWEthBalance';

interface Props {
  accountAddress: Address;
  title: string;
}

export const Account = ({
  accountAddress,
  title,
}: Props) => {
  const wEthBalance = useWEthBalance(accountAddress);
  const wstEthBalance = useWstWEthBalance(accountAddress);
  const suppliedWstEthBalance = useSuppliedWstEthBalance(accountAddress);
  const borrowedWEthBalance = useBorrowedWEthBalance(accountAddress);

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>
          {title}
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Addresses:
            </Heading>
            <Text pt='2' fontSize='sm'>
              {accountAddress}
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
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Supplied wstETH + Interest
            </Heading>
            <Text pt='2' fontSize='sm'>
              {formatEther(suppliedWstEthBalance.data || 0n)}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Borrowed WETH + Interest
            </Heading>
            <Text pt='2' fontSize='sm'>
              {formatEther(borrowedWEthBalance.data || 0n)}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};