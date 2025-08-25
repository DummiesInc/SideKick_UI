import { BASE_URL, apiRequest } from '@/src/utils/api';
import { z } from 'zod';

export const customerSchema = z.object({
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

export type RequestCustomerDto = z.infer<typeof customerSchema>;
export type GetCustomerDto = z.infer<typeof customerSchema>;

export async function createCustomer(
  customer: RequestCustomerDto
): Promise<GetCustomerDto> {
  const data = await apiRequest<RequestCustomerDto, GetCustomerDto>(
    `${BASE_URL}/customer`,
    'POST',
    customer
  );
  return data;
  //   return CustomerSchema.parse(data);
}
