import { BASE_URL, apiRequest } from '@/src/utils/api';
import { z } from 'zod';

export const CustomerSchema = z.object({
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

// export async function fetchStates(
//   setStates: React.Dispatch<React.SetStateAction<State[]>>
// ): Promise<State[]> {
//   const data = await apiRequest<undefined, State[]>(`${BASE_URL}/states`, 'GET');
//   setStates(data);
//   console.log(data);
//   return data; // runtime validation
// }

// export async function fetchState(id: number): Promise<State> {
//   const data = await apiRequest<undefined, State>(`${BASE_URL}/states/${id}`, 'GET');
//   return StateSchema.parse(data);
// }

export async function createCustomer(customer: Customer): Promise<Customer> {
  console.log(customer);
  const data = await apiRequest<Customer, Customer>(
    `${BASE_URL}/customer`,
    'POST',
    customer
  );
  return data;
  //   return CustomerSchema.parse(data);
}
