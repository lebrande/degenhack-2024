import { Box, SimpleGrid } from "@chakra-ui/react";
import { Product } from "./Product";

interface Props {
  goToProduct: () => void;
}

export const Dashboard = ({
  goToProduct,
}: Props) => {
  return (
    <SimpleGrid columns={1} spacing={10} maxW="60rem" mx="auto" py="4rem">
      <Product
        goToProduct={goToProduct}
        title="Fixed Stake Rate ETH Deposit"
        summary={(
          <>
            Earn fix rate interest during 28 days with <strong>23.40% APR</strong>
          </>
        )}
      />
      <Product
        title="Gas Optimiser (coming soon)"
        summary={(
          <>
            Your shield for gas price peaks.<br/>
            Plan your Ethereum Operations with fixed back-office.
          </>
        )}
      />
      <Product
        title="Fixed Interest Rate Stablecoin Loan (coming soon)"
        summary={(
          <>
            Earn fix yield on USDC, USDT or DAI
          </>
        )}
      />
    </SimpleGrid>
  );
};