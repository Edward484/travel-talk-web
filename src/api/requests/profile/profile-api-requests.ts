import {getRequest, patchRequest} from '../../utils/QueryClient';
import { User } from '../../../models/user';

export async function getCurrentUser(token: string) {
  try {
    const res = await getRequest<User>('/User/current', token);
    return res.data;
  } catch (e) {
    return undefined;
  }
}

export async function changeUserName(userName:string, token: string){
  try {
    const res = await patchRequest(
        '/User/change',
        {NewUsername: userName},
        token,
    );
    return res.data;
  }catch (e){
    return undefined;
  }
}
