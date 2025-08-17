import { BASE_URL, apiRequest } from '@/src/utils/api';
import { z } from 'zod';

export const CustomerSchema = z.object({
  id: z.number().optional().nullable(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  buyInReason: z.string().optional(),
  vision: z.string().optional(),
  involvement: z.string().optional(),
  capitalId: z.number(),
  financeRequired: z.boolean().optional(),
  startDate: z.string().optional()
});

export type Customer = z.infer<typeof CustomerSchema>;

export async function createCustomer(customer: Customer): Promise<Customer> {
  const data = await apiRequest<Customer, Customer>(
    `${BASE_URL}/customer`,
    'POST',
    customer
  );
  return data;
  //   return CustomerSchema.parse(data);
}
