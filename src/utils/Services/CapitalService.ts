import { BASE_URL, apiRequest } from '@/src/utils/api';
import { z } from 'zod';

const capitalSchema = z.object({
  id: z.number(),
  name: z.string()
});

export type GetCapitalDto = z.infer<typeof capitalSchema>;

export async function fetchCapitals(): Promise<SelectOption[]> {
  const data = await apiRequest<undefined, GetCapitalDto[]>(
    `${BASE_URL}/capital`,
    'GET'
  );

  return data?.map((item) => ({ label: item.name, value: Number(item.id) }));
}
