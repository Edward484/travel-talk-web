import { atom } from 'recoil';
import { CategoryApiResponse } from '../../api/types/categories';

export const ALL_CATEGORIES_ATOM_KEY = 'all-categories';
export const allCategoriesAtom = atom<CategoryApiResponse[]>({
  key: ALL_CATEGORIES_ATOM_KEY,
  default: [],
});
