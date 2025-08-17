import { BASE_URL, apiRequest } from '@/src/utils/api';
import { z } from 'zod';

const FranchiseSchema = z.object({
  id: z.number(),
  name: z.string(),
  capital: z.object({
    id: z.number(),
    name: z.string()
  })
});

const FranchiseReportSchema = z.object({
  customerName: z.string(),
  buyInReason: z.string(),
  vision: z.string(),
  involvement: z.string(),
  capital: z.string(),
  franchises: z.array(FranchiseSchema)
});

export type Franchise = z.infer<typeof FranchiseSchema>;
export type FranchiseReportType = z.infer<typeof FranchiseReportSchema>;

export async function fetchFranchiseForCustomer(
  customerId: number
): Promise<FranchiseReportType> {
  const data = await apiRequest<undefined, FranchiseReportType>(
    `${BASE_URL}/franchise/customer/${customerId}`,
    'GET'
  );

  return data;
}
