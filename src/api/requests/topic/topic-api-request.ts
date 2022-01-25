import {deleteRequest, getRequest, patchRequest, postRequest} from "../../utils/QueryClient";

export async function createTopic(title:string, desc:string, categId:number, token:string){
    const res = await postRequest(
        '/Topic',
        {Title:title,
                Description:desc,
                CategoryId:categId},
        token
    );
}

export async function getTopicById(id:number,token:string){
    const res = await getRequest(
        `/Topic/${id}`,
        token
    );
    return res.data;
}

export async function updateTopicDescription(id:number, token:string){
    const res = await patchRequest(
        `/Topic/${id}`,
        token
    )
    return res;
}

export async function deleteTopicById(id:number, token:string){
    const res = await deleteRequest(
        `/Topic/${id}`,
        token
    )
}