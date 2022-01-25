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

const TopicPage = () =>{
    const apiToken = useRecoilValue(authTokenAtom); // test purpose
    const {topicId} = useParams();
    const {data, isLoading} = useQuery<CategoryTopicApiResponse>(`/Post/${topicId}`, ["topic", topicId])
    //afisare in fct de isLoading
    const renderPosts = () =>{}

    return(
        <Box display="flex" marginLeft="0.25rem" justifyContent="center">
            <h1>Hi</h1>
        </Box>
    )
}

export default TopicPage;