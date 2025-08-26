import { z } from 'zod';

export const getFranchiseBrandReputationSchema = z
  .object({
    foundingDate: z.string().nullable(),
    franchiseProgramYear: z.string().nullable(),
    totalUnits: z.number().nullable(),
    growthRate: z.number().nullable(),
    satisfactionScore: z.number().nullable()
  })
  .nullable()
  .optional();

export const getFranchiseFinancialInformationSchema = z
  .object({
    capital: z
      .object({
        // total investment range
        name: z.string().nullable()
      })
      .nullable(),
    royaltyFee: z.number().nullable(),
    marketingFee: z.number().nullable(),
    softwareLicenseFee: z.number().nullable(),
    renewalFee: z.number().nullable(),
    trainingFee: z.number().nullable(),
    supplyFee: z.number().nullable(),
    profitMargin: z.number().nullable(),
    netWorthRequirement: z.number().nullable(),
    liquidityRequirement: z.number().nullable()
  })
  .nullable()
  .optional();

export const getFranchiseOperationInformationSchema = z
  .object({
    // update this and make it a DB table
    ownershipModel: z.string().nullable(),
    staffCountRequirement: z.number().nullable(),
    approvedSupplierOnly: z.boolean().nullable(),
    corporateSupplierOnly: z.boolean().nullable()
  })
  .nullable()
  .optional();

export const getFinancialProfileFormSchema = z.object({
  franchise: z
    .object({
      name: z.string().nullable(),
      website: z.string().nullable(),
      mission: z.string().nullable(),
      contactPerson: z.string().nullable(),
      phoneNumber: z.string().nullable()
    })
    .nullable()
    .optional(),
  brandReputation: getFranchiseBrandReputationSchema,

  financialInformation: getFranchiseFinancialInformationSchema,

  operationInformation: getFranchiseOperationInformationSchema
});

export const updateFinancialProfileFormSchema = z.object({
  franchise: z.object({
    name: z.string(),
    website: z.url('Invalid URL'),
    mission: z.string().nullable(),
    contactPerson: z.string(),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9\s-()]{7,20}$/, 'Invalid phone number')
  }),
  brandReputation: z.object({
    foundingDate: z.string(),
    franchiseProgramYear: z.string(),
    totalUnits: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional(),
    growthRate: z
      .number()
      .nonnegative()
      .min(0.1, 'Please enter a value')
      .optional(),
    satisfactionScore: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional()
  }),

  financialInformation: z.object({
    capital: z.object({
      // total investment range
      name: z.string()
    }),
    royaltyFee: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional()
      .refine((val) => val !== undefined && !isNaN(val), {
        message: 'Please enter a value'
      }),

    // royaltyFee: z.union([
    //   z.undefined(),
    //   z.coerce.number().nonnegative().min(1, '')
    // ]),

    marketingFee: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional(),
    softwareLicenseFee: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional(),
    renewalFee: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional(),
    trainingFee: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional(),
    supplyFee: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional(),
    profitMargin: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional(),
    netWorthRequirement: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional(),
    liquidityRequirement: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional()
  }),

  operationInformation: z.object({
    // update this and make it a DB table
    ownershipModel: z.string(),
    staffCountRequirement: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
      .optional(),
    approvedSupplierOnly: z.boolean(),
    corporateSupplierOnly: z.boolean()
  })
});

export type GetFinancialProfileDto = z.infer<
  typeof getFranchiseBrandReputationSchema
>;

export type UpdateFinancialProfileDto = z.infer<
  typeof updateFinancialProfileFormSchema
>;
