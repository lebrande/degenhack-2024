import { z } from 'zod';

const AddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);

const NumberStringSchema = z.string().regex(/^-?[0-9]+(\.[0-9]+)?$/);

const NumberNullableStringSchema = NumberStringSchema.nullable();

const NumberNullableStringBigIntTransformedSchema =
  NumberNullableStringSchema.transform((val) =>
    val ? BigInt(val) : undefined,
  );

const RiskIndicatorsSchema = z.object({
  maxCollateralRatio: NumberNullableStringBigIntTransformedSchema,
  maxCollateralRatioPerLeg: NumberNullableStringBigIntTransformedSchema,
  maxLeverage: NumberNullableStringBigIntTransformedSchema,
  baseSpread: NumberNullableStringBigIntTransformedSchema,
  fixedRateCap: NumberNullableStringBigIntTransformedSchema,
  demandSpreadFactor: NumberNullableStringBigIntTransformedSchema,
  expirationTimestamp: NumberNullableStringBigIntTransformedSchema,
  assetAddress: AddressSchema,
  tenor: z.string(),
  direction: z.string(),
  sign: z.string(),
});

export const OpenSwapRiskIndicatorsSchema = z.object({
  parameters: z.array(RiskIndicatorsSchema),
});
