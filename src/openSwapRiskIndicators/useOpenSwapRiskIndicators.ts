import { OpenSwapRiskIndicatorsSchema } from './schema';
import { useApiQuery } from '../hooks/useApiQuery';
import { Address } from 'viem';

/**
 * 0 - go up / pay fixed / receive floating
 * 1 - go down / pay floating / receive fixed
 */
const SWAP_DIRECTIONS = ['payFixed', 'receiveFixed'] as const;
export type SwapDirection = (typeof SWAP_DIRECTIONS)[number];

/**
 * 0 - 28 days
 * 1 - 60 days
 * 2 - 90 days
 */
// It's better if label starts from a letter, not a number
const SWAP_TENOR_KEYS = ['days28', 'days60', 'days90'] as const;
export type SwapTenorKey = (typeof SWAP_TENOR_KEYS)[number];

const useOpenSwapRiskIndicators = () => {
  const chainId = 1;

  const queryResult = useApiQuery({
    chainId,
    path: `/risk-management/open-swap-parameters-${chainId}`,
    schema: OpenSwapRiskIndicatorsSchema,
  });

  return queryResult;
};

const queryTenor: Record<SwapTenorKey, 'DAYS_28' | 'DAYS_60' | 'DAYS_90'> = {
  days28: 'DAYS_28',
  days60: 'DAYS_60',
  days90: 'DAYS_90',
};

const queryDirection: Record<SwapDirection, 'PAY_FIXED' | 'RECEIVE_FIXED'> = {
  payFixed: 'PAY_FIXED',
  receiveFixed: 'RECEIVE_FIXED',
};

interface Args {
  assetAddress: Address;
  direction: SwapDirection;
  tenor: SwapTenorKey;
}

export const useOpenSwapRiskIndicatorsData = ({
  assetAddress,
  direction,
  tenor,
}: Args) => {
  const { data } = useOpenSwapRiskIndicators();

  if (!data) {
    return undefined;
  }

  const { parameters } = data;

  const foundParameters = parameters.find(
    (el) =>
      el.direction === queryDirection[direction] &&
      el.tenor === queryTenor[tenor] &&
      el.assetAddress === assetAddress,
  );

  return foundParameters;
};

export type OpenSwapRiskIndicatorsData = ReturnType<
  typeof useOpenSwapRiskIndicatorsData
>;
