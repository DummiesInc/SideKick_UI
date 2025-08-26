import { UpdateFinancialProfileDto } from '@/src/components/Franchise/FinancialProfileHelper';
import { BASE_URL, DEBUG_URL, apiRequest, keysToSnake } from '@/src/utils/api';
import { z } from 'zod';

const franchiseSchema = z.object({
  id: z.number(),
  name: z.string(),
  capital: z.object({
    id: z.number(),
    name: z.string()
  })
});

const franchiseReportSchema = z.object({
  customerName: z.string(),
  buyInReason: z.string(),
  vision: z.string(),
  involvement: z.string(),
  capital: z.string(),
  franchises: z.array(franchiseSchema)
});

export type Franchise = z.infer<typeof franchiseSchema>;
export type FranchiseReportType = z.infer<typeof franchiseReportSchema>;

export async function fetchFranchiseForCustomer(
  customerId: number
): Promise<FranchiseReportType> {
  const data = await apiRequest<undefined, FranchiseReportType>(
    `${BASE_URL}/franchise/customer/${customerId}`,
    'GET'
  );

  return data;
}

/// ------>

const franchiseDataSchema = z.object({
  id: z.int().optional(),
  name: z.string(),
  capital: z.object({
    name: z.string()
  })
});

const franchiseTableSchema = z.object({
  totalPages: z.int(),
  totalCount: z.int(),
  franchises: z.array(franchiseDataSchema)
});

const franchiseTableFilter = z.object({
  franchiseName: z.string().nullable().optional()
});

export type GetFranchiseDto = z.infer<typeof franchiseTableSchema>;
export type FranchiseData = z.infer<typeof franchiseDataSchema>;
export type FranchiseFilter = z.infer<typeof franchiseTableFilter>;

export async function getFranchises(
  page: number,
  setCurrentPage: (value: React.SetStateAction<number>) => void,
  setTotalPages: (value: React.SetStateAction<number>) => void,
  setData: (value: React.SetStateAction<FranchiseData[]>) => void,
  param?: FranchiseFilter
) {
  try {
    const data = await apiRequest<undefined, GetFranchiseDto>(
      `${BASE_URL}/franchises`,
      'GET',
      undefined,
      undefined,
      {
        page,
        perPage: 10,
        param
      }
    );
    setCurrentPage(page);
    setData(data?.franchises ?? []);
    setTotalPages(data.totalPages === 0 ? 1 : data.totalPages);
  } catch (_err) {
    setCurrentPage(1);
    setData([]);
    setTotalPages(1);
  }
}

export async function getFranchiseProfile(franchiseId: string) {
  try {
    await apiRequest<undefined, GetFranchiseDto>(
      `${BASE_URL}/franchise/${franchiseId}`,
      // `${DEBUG_URL}/franchise/${franchiseId}`,
      'GET'
    );
  } catch (err) {}
}

export async function updateFranchiseProfile(
  franchiseId: number,
  body: UpdateFinancialProfileDto
): Promise<any> {
  var convertedBody = keysToSnake<UpdateFinancialProfileDto>(body);
  try {
    await apiRequest<any, undefined>(
      `${BASE_URL}/franchise/${franchiseId}`,
      // `${DEBUG_URL}/franchise/${franchiseId}`,
      'PUT',
      convertedBody
    );
  } catch (err) {}

  //   return CustomerSchema.parse(data);
}
