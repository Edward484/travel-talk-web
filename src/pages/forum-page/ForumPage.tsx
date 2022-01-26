import React, { useState } from 'react';
import style from './ForumPage.module.scss';
import {useRecoilValue} from "recoil";
import {authTokenAtom} from "../../global/atoms/AuthAtoms";
import Topic from "../../components/topic/Topic";
import useQuery from "../../api/hooks/useQuery";
import {Link, useParams} from "react-router-dom";
import {CategoryApiResponse} from "../../api/types/categories";
import {Box} from "@mui/material";

const ForumPage = () =>{
    const apiToken = useRecoilValue(authTokenAtom); // test purpose
    const {categoryId} = useParams();
    const {data, isLoading} = useQuery<CategoryApiResponse>(`/Category/${categoryId}`, ["category", categoryId])
    //afisare in fct de isLoading
    const renderTopics = () =>
        (data?.topics??[]).map(topic => (
                <Topic topic={topic} key={topic.topicId}/>))
    return(
        <Box display="flex" marginLeft="0.25rem" justifyContent="center">
                {renderTopics()}
        </Box>
    )
}

export default ForumPage;