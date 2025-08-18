import { BASE_URL, apiRequest } from '@/src/utils/api';
import { z } from 'zod';

export const MapRequestSchema = z.object({
  id: z.number().optional().nullable(),
  north: z.float32(),
  south: z.float32(),
  east: z.float32(),
  west: z.float32()
});

export const MapResponseSchema = z.object({
  id: z.number().optional().nullable(),
  longitude: z.float32(),
  latitude: z.float32(),
  franchise: z.object({
    id: z.number(),
    name: z.string(),
    capital: z.object({
      name: z.string()
    })
  })
});

export type MapRequest = z.infer<typeof MapRequestSchema>;

export type MapResponse = z.infer<typeof MapResponseSchema>;

export async function getInvestmentLocations(
  map: MapRequest
): Promise<MapResponse[]> {
  const data = await apiRequest<MapRequest, MapResponse[]>(
    `${BASE_URL}/investment/location`,
    'GET',
    undefined,
    undefined,
    map
  );
  return data;
  //   return CustomerSchema.parse(data);
}
