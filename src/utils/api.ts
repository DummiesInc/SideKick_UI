import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL = 'http://localhost:3001';

export const DEBUG_URL = 'http://127.0.0.1:3000';

export async function apiRequest<TRequest, TResponse>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
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

const camelToSnake = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

// Recursively transform keys of an object
export const keysToSnake = <T>(obj: T): any => {
  if (Array.isArray(obj)) {
    return obj.map(keysToSnake);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        camelToSnake(key),
        keysToSnake(value)
      ])
    );
  }
  return obj;
};
