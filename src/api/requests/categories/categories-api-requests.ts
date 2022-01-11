import { CategoryApiResponse } from '../../types/categories';
import { getRequest, postRequest } from '../../utils/QueryClient';

export async function getAllCategories(): Promise<CategoryApiResponse[]> {
  try {
    const res = await getRequest<CategoryApiResponse[]>('/Category');
    return res.data;
  } catch (e) {
    return [];
  }
}
export async function createCategory(name: string, token: string) {
  const res = await postRequest<CategoryApiResponse, { name: string }>(
    '/Category',
    { name },
    token,
  );
  return res.data;
}
