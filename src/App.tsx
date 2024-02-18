import { useAccount } from 'wagmi';
import { Account } from './account/Account';
import { RevertSwap } from './dev_revertSwap/RevertSwap';
import { FixedStakeRate } from './fixedStakeRate/FixedStakeRate';
import { Navbar } from './navbar/Navbar';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { ApproveOpenPosition } from './approveOpenPosition/ApproveOpenPosition';
import { FIXED_STAKE_RATE_ADDRESS } from './contracts/FixedStakeRate';
import { ApproveDebtDelegation } from './approveDebtDelegation/ApproveDebtDelegation';

function App() {
  const { address } = useAccount();

  return (
    <Box minH="100vh">
      <Navbar />
      <SimpleGrid columns={2} spacing={10} maxW="60rem" mx="auto" my="4rem">
        {address && (
          <>
            <Account
              accountAddress={FIXED_STAKE_RATE_ADDRESS}
              title="Contract balances"
            />
            <Account
              accountAddress={address}
              title="Wallet balances"
            />
            <ApproveOpenPosition />
            <ApproveDebtDelegation />
            <FixedStakeRate accountAddress={address} />
          </>
        )}
        <RevertSwap />
      </SimpleGrid>
    </Box>
  )
}

export default App
