import React, { useState } from 'react';
import style from './ForumPage.module.scss';
import {useRecoilValue} from "recoil";
import {authTokenAtom} from "../../global/atoms/AuthAtoms";
import Topic from "../../components/topic/Topic";
import useQuery from "../../api/hooks/useQuery";
import {Link, useParams} from "react-router-dom";
import {CategoryApiResponse} from "../../api/types/categories";
import {Box} from "@mui/material";
import {CategoryTopicApiResponse} from "../../api/types/topic";
import {Topic as topicApiResponse} from "../../models/topic";
import {PostList, PostType} from "../../models/post";
import Post from "../../components/post/Post";
import {getPostsByTopicId} from "../../api/requests/post/post-api-request";
import TestPage from "../test-page/TestPage";



const TopicPage = () => {
    const apiToken = useRecoilValue(authTokenAtom); // test purpose
    const {topicId} = useParams();
    const {data, isLoading} = useQuery<topicApiResponse>(`/Topic/${topicId}?expanded=true`, ["topic", topicId])
    //const {data:datal, isLoading:isLoadingl} = useQuery<PostList>(`/Post/${topicId}`, ["posts", topicId]);
    //afisare in fct de isLoading
    console.log("topic:", data)

    const renderPosts = () => {
        console.log("Posts:",data);
        return (data?.posts??[]).map( post =>
            <Post post={post}/>
        )
    }

    return (
        <Box display="flex" marginLeft="0.25rem" justifyContent="center">
            {renderPosts()}
            <TestPage/>
        </Box>
    )
}

export default TopicPage;