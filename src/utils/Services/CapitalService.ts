import { BASE_URL, apiRequest } from '@/src/utils/api';
import { z } from 'zod';

const CapitalSchema = z.object({
  id: z.number(),
  name: z.string()
});

export type Capital = z.infer<typeof CapitalSchema>;

export async function fetchCapitals(): Promise<SelectOption[]> {
  const data = await apiRequest<undefined, Capital[]>(
    `${BASE_URL}/capital`,
    'GET'
  );

  return data?.map((item) => ({ label: item.name, value: Number(item.id) }));
}
