import { OpenSwapRiskIndicatorsSchema } from './schema';
import { z } from 'zod';

export type OpenSwapRiskIndicators = z.infer<
  typeof OpenSwapRiskIndicatorsSchema
>;
