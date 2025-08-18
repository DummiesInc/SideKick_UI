import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL = 'http://localhost:3001';

export async function apiRequest<TRequest, TResponse>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: TRequest,
  config?: AxiosRequestConfig,
  params?: any
): Promise<TResponse> {
  const response = await axios.request<TResponse>({
    url,
    method,
    data,
    headers: { 'Content-Type': 'application/json' },
    params: params,
    ...config
  });

  return response.data;
}
