import { Account } from './account/Account';
import { FixedStakeRate } from './fixedStakeRate/FixedStakeRate';
import { Navbar } from './navbar/Navbar';
import { Box, SimpleGrid } from '@chakra-ui/react';

function App() {
  return (
    <Box minH="100vh">
      <Navbar />
      <SimpleGrid columns={2} spacing={10} maxW="60rem" mx="auto" my="4rem">
        <Account />
        <FixedStakeRate />
      </SimpleGrid>
    </Box>
  )
}

export default App
