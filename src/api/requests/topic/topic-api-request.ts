import {deleteRequest, postRequest} from "../../utils/QueryClient";

export async function createTopic(title:string, desc:string, categId:number, token:string){
    const res = await postRequest(
        '/Topic',
        {Title:title,
                Description:desc,
                CategoryId:categId},
        token
    );
}