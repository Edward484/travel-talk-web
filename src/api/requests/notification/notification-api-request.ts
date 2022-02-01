import { User } from '../../../models/user';
import {deleteRequest, getRequest, patchRequest, postRequest} from '../../utils/QueryClient';


export async function getUserNotification(token:string) {
    try{
        const res = await getRequest('/Notification/current', token);
        return res;
    }
    catch (e){
        return undefined;
    }
}
export async function postUserNotification(postId:number,token:string) {
    try{
        const res = await postRequest(
            `Notification/${postId}`,
            {},
            token);
        console.log(res)
        return res;
    }
    catch (e){
        return undefined;
    }
}
export async function changeUserNotification(notificationId:number,token:string) {
    try{
        const res = await patchRequest(
            `/Notification/${notificationId}`, token);
        return res;
    }
    catch (e){
        return undefined;
    }
}
export async function deleteUserNotification(notificationId:number,token:string) {
    try{
        const res = await deleteRequest(
            `/Notification/${notificationId}`, token);
        return res;
    }
    catch (e){
        return undefined;
    }
}


