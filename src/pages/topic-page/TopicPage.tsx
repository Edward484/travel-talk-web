import React, { useState } from 'react';
import style from './ForumPage.module.scss';
import {useRecoilValue} from "recoil";
import {authTokenAtom} from "../../global/atoms/AuthAtoms";
import Topic from "../../components/topic/Topic";
import useQuery from "../../api/hooks/useQuery";
import {Link, useParams} from "react-router-dom";
import {CategoryApiResponse} from "../../api/types/categories";
import {Box, Grid, Paper, Typography} from "@mui/material";
import {CategoryTopicApiResponse} from "../../api/types/topic";
import {Topic as topicApiResponse} from "../../models/topic";
import {PostList, PostType} from "../../models/post";
import Post from "../../components/post/Post";
import {getPostsByTopicId} from "../../api/requests/post/post-api-request";
import CreatePost from "../../components/post/CreatePost";



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
            <Grid item xs={13} sm={10} md={7} xl={7}
                  sx={{my:0.2}}>
                <Post post={post} key={post.postId}/>
            </Grid>
        )
    }

    return (
        <Grid
            container={true}
            justifyContent="center"
            xs={20}
            sm={15}
            xl={14}
            direction='column'
            px={{xs:3, sm :10, md:38,xl: 50}}>
            <Grid>
            {(data?.posts??[]).length === 0 && <Typography display='block'>No posts on this topic yet</Typography>}
            </Grid>
            {renderPosts()}
            <CreatePost topicId={topicId}/>
        </Grid>
    )
}

export default TopicPage;