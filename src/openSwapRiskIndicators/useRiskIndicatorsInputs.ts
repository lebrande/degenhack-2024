import { useOpenSwapRiskIndicatorsData, SwapDirection, SwapTenorKey } from './useOpenSwapRiskIndicators';
import { Address, Hash } from 'viem';

interface RiskIndicatorsInputs {
  maxCollateralRatio: bigint;
  maxCollateralRatioPerLeg: bigint;
  maxLeveragePerLeg: bigint;
  baseSpreadPerLeg: bigint;
  fixedRateCapPerLeg: bigint;
  demandSpreadFactor: bigint;
  expiration: bigint;
  signature: Hash;
}

export const useRiskIndicatorsInputs = ({
  assetAddress,
  direction,
  tenor,
}: {
  assetAddress: Address;
  direction: SwapDirection;
  tenor: SwapTenorKey;
}): RiskIndicatorsInputs | undefined => {
  const foundParameters = useOpenSwapRiskIndicatorsData({
    assetAddress,
    direction,
    tenor,
  });

  if (foundParameters === undefined) {
    return undefined;
  }

  const {
    maxCollateralRatio,
    maxCollateralRatioPerLeg,
    maxLeverage,
    baseSpread,
    fixedRateCap,
    demandSpreadFactor,
    expirationTimestamp,
    sign,
  } = foundParameters;

  if (
    maxCollateralRatio === undefined ||
    maxCollateralRatioPerLeg === undefined ||
    maxLeverage === undefined ||
    baseSpread === undefined ||
    fixedRateCap === undefined ||
    demandSpreadFactor === undefined ||
    expirationTimestamp === undefined
  ) {
    return undefined;
  }

  return {
    maxCollateralRatio,
    maxCollateralRatioPerLeg,
    maxLeveragePerLeg: maxLeverage,
    baseSpreadPerLeg: baseSpread,
    fixedRateCapPerLeg: fixedRateCap,
    demandSpreadFactor: demandSpreadFactor,
    expiration: expirationTimestamp,
    signature: sign as Hash,
  };
};
