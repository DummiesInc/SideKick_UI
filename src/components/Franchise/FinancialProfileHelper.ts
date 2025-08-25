import { z } from 'zod';

export const GetFinancialProfileFormSchema = z.object({
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
  brandReputation: z
    .object({
      foundingDate: z.string().nullable(),
      franchiseProgramYear: z.string().nullable(),
      totalUnits: z.number().nullable(),
      growthRate: z.number().nullable(),
      satisfactionScore: z.number().nullable()
    })
    .nullable()
    .optional(),

  financialInformation: z
    .object({
      franchiseFee: z.number().nullable(),
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
    .optional(),

  operationInformation: z
    .object({
      // update this and make it a DB table
      ownershipModel: z.string().nullable(),
      staffCountRequired: z.number().nullable(),
      approvedSupplierOnly: z.boolean().nullable(),
      coporateSupplierOnly: z.boolean().nullable()
    })
    .nullable()
    .optional()
});

export const UpdateFinancialProfileFormSchema = z.object({
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
    totalUnits: z.number().nonnegative().min(1, 'Please enter a value'),
    growthRate: z.number().nonnegative().min(0.1, 'Please enter a value'),
    satisfactionScore: z.number().nonnegative().min(1, 'Please enter a value')
  }),

  financialInformation: z.object({
    franchiseFee: z.number().nonnegative().min(1, 'Please enter a value'),
    capital: z.object({
      // total investment range
      name: z.string()
    }),
    royaltyFee: z.number().nonnegative().min(1, 'Please enter a value'),
    marketingFee: z.number().nonnegative().min(1, 'Please enter a value'),
    softwareLicenseFee: z.number().nonnegative().min(1, 'Please enter a value'),
    renewalFee: z.number().nonnegative().min(1, 'Please enter a value'),
    trainingFee: z.number().nonnegative().min(1, 'Please enter a value'),
    supplyFee: z.number().nonnegative().min(1, 'Please enter a value'),
    profitMargin: z.number().nonnegative().min(1, 'Please enter a value'),
    netWorthRequirement: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value'),
    liquidityRequirement: z
      .number()
      .nonnegative()
      .min(1, 'Please enter a value')
  }),

  operationInformation: z.object({
    // update this and make it a DB table
    ownershipModel: z.string(),
    staffCountRequired: z.number().nonnegative().min(1, 'Please enter a value'),
    approvedSupplierOnly: z.boolean(),
    coporateSupplierOnly: z.boolean()
  })
});

export type GetFinancialProfileDto = z.infer<
  typeof GetFinancialProfileFormSchema
>;

export type UpdateFinancialProfileDto = z.infer<
  typeof UpdateFinancialProfileFormSchema
>;
