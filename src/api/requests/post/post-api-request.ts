import { User } from '../../../models/user';
import {deleteRequest, getRequest, patchRequest} from '../../utils/QueryClient';


export async function deletePost(postId: number, token: string){
    try {
        const res = await deleteRequest<User, {postId: number}>(
            '/Post/current',
            {postId: postId},
            token,
        );
        return res.data;
    }catch (e){
        return undefined;
    }
}