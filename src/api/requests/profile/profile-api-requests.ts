import {deleteRequest, getRequest, patchRequest, postRequest} from '../../utils/QueryClient';
import { User } from '../../../models/user';

export async function getCurrentUser(token: string) {
  try {
    const res = await getRequest<User>('/User/current', token);
    return res.data;
  } catch (e) {
    return undefined;
  }
}

export async function createUserByAdmin(email:string, username:string, password:string, token:string){
  try {
    const res = await postRequest(
        '/User',
        {Email:email, Username:username, Password:password},
        token,
    );
    return res.data;
  }catch (e){
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

export async function deleteUser(userId:number, token:string){
  try{
    const res = await deleteRequest(
        `/User/${userId}`,
        token)
  }catch(e){
    return undefined;
  }
}
