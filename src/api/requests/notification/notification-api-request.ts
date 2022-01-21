import { User } from '../../../models/user';
import {getRequest} from '../../utils/QueryClient';


export async function getUserNotification(token:string) {
    try{
        const res = await getRequest('/Notification/current', token);
        return res;
    }
    catch (e){
        return undefined;
    }
}