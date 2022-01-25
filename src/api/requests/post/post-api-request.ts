import { User } from '../../../models/user';
import {deleteRequest, getRequest, patchRequest, postRequest} from '../../utils/QueryClient';


export async function deletePost(postId: number, token: string){
    try {
        const res = await deleteRequest(
            `/Post/${postId}`,
            token,
        );
        return res.data;
    }catch (e){
        return undefined;
    }
}

export async function upVotePost(postId: number, token: string){
    try {
        const res = await patchRequest(
            `/Post/${postId}`,
            token,
        );
        return res.data;
    }catch (e){
        return undefined;
    }
}

export async function updatePostContent(postId: number, content:string, token: string){
    try {
        const res = await patchRequest(
            `/Post/change`,
            {postId: postId, content:content},
            token,
        );
        return res.data;
    }catch (e){
        return undefined;
    }
}

export async function getPostsByTopicId(id:number, token: string){
    try {
        const res = await getRequest(
            `/Post/${id}`,
            token,
        );
        return res.data;
    }catch (e){
        return undefined;
    }
}
export async function createPost(topicId:number,content:string,imageUrl:string, token: string){
    try {
        const res = await postRequest(
            `/Post`,
            {Content:content,TopicId:topicId, ImageURL:imageUrl},
            token,
        );
        return res.data;
    }catch (e){
        return undefined;
    }
}