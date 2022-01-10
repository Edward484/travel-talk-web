import { getRequest } from '../../utils/QueryClient';
import { User } from '../../../models/user';

export async function getCurrentUser(token: string) {
  try {
    const res = await getRequest<User>('/User/current', token);
    return res.data;
  } catch (e) {
    return undefined;
  }
}
