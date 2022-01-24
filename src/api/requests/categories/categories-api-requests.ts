import { CategoryApiResponse } from '../../types/categories';
import {deleteRequest, getRequest, patchRequest, postRequest} from '../../utils/QueryClient';

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

export async function changeCategoryName(categId:number, newName: string, token:string){
  const res = await patchRequest(
      '/Category',
      {CategoryId : categId, newName:newName},
      token
  );
  return res.data;
}

export async function deleteCategoryById(categId:number, token:string){
  const res = await deleteRequest(
      '/Category',
      {CategoryId: categId},
      token
  );
}
