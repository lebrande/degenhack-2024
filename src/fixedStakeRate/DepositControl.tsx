import { Box, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { formatEther } from "viem";
import { FIXED_STAKE_RATE_ADDRESS } from "../contracts/FixedStakeRate";
import { useWstWEthBalance } from "../hooks/useWstWEthBalance";

interface Props {
  depositAmount: number;
  setDepositAmount: (depositAmount: number) => void
}

export const DepositControl = ({
  depositAmount,
  setDepositAmount,
}: Props) => {
  const wEthBalance = useWstWEthBalance(FIXED_STAKE_RATE_ADDRESS);

  if (wEthBalance === undefined) {
    return null; 
  }

  const wEthBalanceFormatted = +formatEther(wEthBalance.data || 0n);
  const wEthBalanceNumber = +wEthBalanceFormatted;

  return (
    <Box>
      <Text as="label">Deposit</Text>
      <Flex>
        <NumberInput
          step={0.0001}
          defaultValue={0}
          min={0}
          max={wEthBalanceNumber}
          maxW='100px'
          mr='2rem'
          value={depositAmount}
          onChange={(v) => setDepositAmount(+v)}
          minW="12rem"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          flex='1'
          focusThumbOnChange={false}
          value={depositAmount}
          onChange={setDepositAmount}
          max={wEthBalanceNumber}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize='sm' boxSize='32px' />
        </Slider>
      </Flex>
    </Box>
  );
};