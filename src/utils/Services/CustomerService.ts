import { BASE_URL, apiRequest } from '@/src/utils/api';
import { z } from 'zod';

export const CustomerRequestSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  buyInReason: z.string().optional(),
  vision: z.string().optional(),
  involvement: z.string().optional(),
  capitalId: z.number(),
  financeRequired: z.boolean().optional(),
  startDate: z.string().optional()
});

export const CustomerResponseSchema = z.object({
  id: z.number(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  buyInReason: z.string().optional(),
  vision: z.string().optional(),
  involvement: z.string().optional(),
  capitalId: z.number(),
  financeRequired: z.boolean().optional(),
  startDate: z.string().optional()
});

export type CustomerRequest = z.infer<typeof CustomerRequestSchema>;

export type CustomerResponse = z.infer<typeof CustomerResponseSchema>;

export async function createCustomer(
  customer: CustomerRequest
): Promise<CustomerResponse> {
  const data = await apiRequest<CustomerRequest, CustomerResponse>(
    `${BASE_URL}/customer`,
    'POST',
    customer
  );
  return data;
  //   return CustomerSchema.parse(data);
}
