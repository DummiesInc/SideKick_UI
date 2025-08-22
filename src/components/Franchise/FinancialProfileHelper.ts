import { z } from 'zod';

export const FinancialProfileFormSchema = z.object({
  name: z.string(),
  website: z.string().nullable(),
  mission: z.string().nullable(),
  contactPerson: z.string(),
  phoneNumber: z.string(),
  industuryCategory: z.string(),
  brandReputation: z.object({
    foundingYear: z.date().nullable(),
    franchiseProgramYear: z.string(),
    // nonoptional?
    totalUnits: z.int().nullable().nonoptional(),
    growthRate: z.int(),
    satisfactionScore: z.int()
  }),
  financialInformation: z.object({
    franchiseFee: z.int(),
    capital: z.object({
      // total investment range
      name: z.string()
    }),
    royaltyFee: z.int(),
    marketingFee: z.int(),
    softwareLicenseFee: z.int(),
    renewalFee: z.int(),
    trainingFee: z.int(),
    supplyFee: z.int(),
    unitGrossRevenue: z.int(),
    profitMargin: z.int().nullable(),
    // in months?
    breakEvenTimelineEst: z.int(),
    netWorthRequirement: z.int(),
    liquidityRequirement: z.int()
  }),
  operationInformation: z.object({
    // update this and make it a DB table
    ownershipModel: z.string(),
    staffCountRequired: z.int(),
    approvedSupplierOnly: z.boolean(),
    coporateSupplierOnly: z.boolean()
  })
});
