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

export type Franchise = z.infer<typeof FranchiseSchema>;

export async function fetchFranchiseForCustomer(customerId: number): Promise<Franchise[]> {
  console.log(customerId)
    const data = await apiRequest<undefined, Franchise[]>(
    `${BASE_URL}/franchise/customer/${customerId}`,
    'GET'
  );

  return data
}
