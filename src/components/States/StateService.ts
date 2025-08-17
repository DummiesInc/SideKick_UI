import { apiRequest } from '@/src/utils/api';
import { z } from 'zod';

const StateSchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string().max(2)
});

export type State = z.infer<typeof StateSchema>;

export const BASE_URL = 'http://localhost:3001/states';

export async function fetchStates(
  setStates: React.Dispatch<React.SetStateAction<State[]>>
): Promise<State[]> {
  const data = await apiRequest<undefined, State[]>(BASE_URL, 'GET');
  setStates(data);
  console.log(data);
  return data; // runtime validation
}

export async function fetchState(id: number): Promise<State> {
  const data = await apiRequest<undefined, State>(`${BASE_URL}/${id}`, 'GET');
  return StateSchema.parse(data);
}

export async function updateState(state: State): Promise<State> {
  const data = await apiRequest<State, State>(
    `${BASE_URL}/${state.id}`,
    'PUT',
    state
  );

  return StateSchema.parse(data);
}
