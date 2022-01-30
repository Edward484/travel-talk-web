import React from 'react'
import Button from "@mui/material/Button";
import {deleteCategoryById} from "../../api/requests/categories/categories-api-requests";
import {useRecoilValue} from "recoil";
import {authTokenAtom} from "../../global/atoms/AuthAtoms";
import {downVotePost, upVotePost} from "../../api/requests/post/post-api-request";

const VoteButton: React.FC<{type:number ,postId:number}> = (props) => {
    const apiToken = useRecoilValue(authTokenAtom)

    const voteHandler = async (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
        if(props.type == 1){
            const res = await upVotePost(props.postId, apiToken!.token)
        }
        if(props.type == 2){
            const res = await downVotePost(props.postId, apiToken!.token)
        }

    }
    return(
        <Button onClick={voteHandler}>
            {props.type === 1 && `UpVote` }
            {props.type === 2 && `DownVote` }
        </Button>
    )
}

export default VoteButton;