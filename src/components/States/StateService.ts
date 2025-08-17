import { BASE_URL, apiRequest } from '@/src/utils/api';
import { z } from 'zod';

const StateSchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string().max(2)
});

export type State = z.infer<typeof StateSchema>;

export async function fetchStates(
  setStates: React.Dispatch<React.SetStateAction<State[]>>
): Promise<State[]> {
  const data = await apiRequest<undefined, State[]>(
    `${BASE_URL}/states`,
    'GET'
  );
  setStates(data);
  return data; // runtime validation
}

export async function fetchState(id: number): Promise<State> {
  const data = await apiRequest<undefined, State>(
    `${BASE_URL}/states/${id}`,
    'GET'
  );
  return StateSchema.parse(data);
}

export async function updateState(state: State): Promise<State> {
  const data = await apiRequest<State, State>(
    `${BASE_URL}/states/${state.id}`,
    'PUT',
    state
  );

  return StateSchema.parse(data);
}
