import axios, { AxiosResponse } from 'axios';
import { QueryClient } from 'react-query';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:5179/api',
});

const getAuthHeader = (token?: string) =>
  token ? { Authorization: `Bearer ${token}` } : undefined;

// TODO: Check what happens if a token expires
// TODO: Auto refresh
export async function getRequest<TResponse>(endpoint: string, token?: string) {
  return axiosClient.get<TResponse>(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export async function postRequest<TResponse, TBody>(
  endpoint: string,
  body: TBody,
  token?: string,
) {
  return axiosClient.post<TBody, AxiosResponse<TResponse>>(endpoint, body, {
    headers: getAuthHeader(token),
  });
}

export async function putRequest<TResponse, TBody>(
  endpoint: string,
  body: TBody,
  token?: string,
) {
  return axiosClient.put<TBody, AxiosResponse<TResponse>>(endpoint, body, {
    headers: getAuthHeader(token),
  });
}

export async function patchRequest<TResponse, TBody>(
  endpoint: string,
  body: TBody,
  token?: string,
) {
  return axiosClient.patch<TBody, AxiosResponse<TResponse>>(endpoint, body, {
    headers: getAuthHeader(token),
  });
}

export async function deleteRequest<TResponse, TBody>(
  endpoint: string,
  body: TBody,
  token?: string,
) {
  return axiosClient.delete<AxiosResponse<TResponse>>(endpoint, {
    headers: getAuthHeader(token),
    data: body,
  });
}

export const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 1000 * 60 * 10, staleTime: 1000 } },
});
