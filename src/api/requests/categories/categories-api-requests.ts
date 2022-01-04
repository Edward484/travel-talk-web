import { CategoryApiResponse } from '../../types/categories';
import { getRequest } from '../../utils/QueryClient';

export async function getAllCategories(): Promise<CategoryApiResponse[]> {
  try {
    const res = await getRequest<CategoryApiResponse[]>('/Categories');
    return res.data;
  } catch (e) {
    return [];
  }
}
