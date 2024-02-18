import { Navbar } from './navbar/Navbar';
import { Box } from '@chakra-ui/react';
import { Dashboard } from './dashboard/Dashboard';
import { FixedStakeRate } from './fixedStakeRate/FixedStakeRate';
import { useState } from 'react';

function App() {
  const [isDashboard, setIsDashboard] = useState(true);
  const goToProduct = () => setIsDashboard(false);
  const goToDashboard = () => setIsDashboard(true);

  return (
    <Box minH="100vh">
      <Navbar />
      {isDashboard && <Dashboard goToProduct={goToProduct} />}
      {!isDashboard && (
        <FixedStakeRate
          goToDashboard={goToDashboard}
        />
      )}
    </Box>
  )
}

export default App
