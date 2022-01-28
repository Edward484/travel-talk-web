import React, { useState } from 'react';
import style from './ForumPage.module.scss';
import {useRecoilValue} from "recoil";
import {authTokenAtom} from "../../global/atoms/AuthAtoms";
import Topic from "../../components/topic/Topic";
import useQuery from "../../api/hooks/useQuery";
import {Link, useParams} from "react-router-dom";
import {CategoryApiResponse} from "../../api/types/categories";
import {Box, Grid} from "@mui/material";
import TestPage from "../test-page/TestPage";
import CreateNewTopic from '../../components/topic/CreateNewTopic';

const ForumPage = () =>{
    const apiToken = useRecoilValue(authTokenAtom); // test purpose
    const {categoryId} = useParams();
    const {data, isLoading} = useQuery<CategoryApiResponse>(`/Category/${categoryId}`, ["category", categoryId])
    //afisare in fct de isLoading
    const renderTopics = () =>
        (data?.topics??[]).map(topic => (
            <Grid item xs={13} sm={10} md={7} xl={7}
                  sx={{my:0.2}}>
                <Box width="100%">
                    <Topic topic={topic} key={topic.topicId}/>
                </Box>
            </Grid>
        ))
    return(
        <Grid
            container={true}
            direction="column"
            xs={20}
            sm={15}
            xl={14}
            px={{xs:3, sm :10, md: 39,xl: 50}}>
            {categoryId && <CreateNewTopic categId={parseInt(categoryId as string)}/>}
            {renderTopics()}
            <TestPage/>
        </Grid>
    )
}

export default ForumPage;