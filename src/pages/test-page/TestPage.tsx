import React from 'react';
import { Box, Icon, Typography } from '@mui/material';
import colors from '../../lib/theme/colors';
import { useRecoilValue } from 'recoil';
import {authTokenAtom, currentUserAtom} from '../../global/atoms/AuthAtoms';
import { useNavigate } from 'react-router';
import style from '../settings-page/SettingsPage.module.scss';
import useLogin from '../../lib/hooks/auth/useLogin';
import {getUserNotification} from "../../api/requests/notification/notification-api-request";
import {
    createPost,
    deletePost,
    getPostsByTopicId,
    updatePostContent,
    upVotePost
} from "../../api/requests/post/post-api-request";
import {changeCategoryName, deleteCategoryById} from "../../api/requests/categories/categories-api-requests";
import {createTopic, getTopicById} from "../../api/requests/topic/topic-api-request";

const TestPage = () => {
    const apiToken = useRecoilValue(authTokenAtom); // test purpose
    const profile = useRecoilValue(currentUserAtom);
    const navigate = useNavigate();
    const { signOut } = useLogin();

    // @param icon is a material icon string
    const renderTestButton = (
        label: string,
        icon: string,
        onClick: () => void,
    ) => (
        <Box
            p="0.5rem"
    sx={{ ':hover': { bgcolor: colors.secondary, cursor: 'pointer' } }}
    onClick={onClick}
    display="flex"
    alignItems="center"
    className={style.sideMenuItem}
    >
    <Box marginRight="0.5rem">
        <Icon>{icon}</Icon>
        </Box>
        <Typography variant="h5" fontSize="1rem" fontWeight="500">
        {label}
        </Typography>
        </Box>
);
    return (
        <Box width="50%" mx="auto" display="flex" paddingTop="10vh">
        <Box
            marginTop="2rem"
            width="200px"
            borderRadius="1rem"
            bgcolor={colors.paper}
            boxShadow={'1px 4px 4px #acacac'}
            marginRight="3rem"
            height="fit-content"
            >
            {renderTestButton('Refresh notifications', 'Notification', async () => {
                if(apiToken) {
                    const res = await getUserNotification(apiToken.token);
                    console.log(res);
                }

            })}
            {renderTestButton('Delete category ', 'Delete', async () => {
                if(apiToken) {
                    const res = await deleteCategoryById(6,apiToken.token);
                    console.log(res);
                }
            })}
            {renderTestButton('Change category name ', 'Delete', async () => {
                if(apiToken) {
                    const res = await changeCategoryName(2,'H',apiToken.token);
                    console.log(res);
                }
            })}
            {renderTestButton('Create topic', 'create', async () => {
                if(apiToken) {
                    const res = await createTopic('First','HaHa',3,apiToken.token);
                    console.log(res);
                }
            })}
            {renderTestButton('Get topic by id', 'create', async () => {
                if(apiToken) {
                    const res = await getTopicById(10, apiToken.token);
                    console.log(res);
                }
            })}
            {renderTestButton('Get posts', 'get', async () => {
                if(apiToken) {
                    const res = await getPostsByTopicId(10, apiToken.token);
                    console.log(res);
                }
            })}
            {renderTestButton('Create post', 'create', async () => {
                if(apiToken) {
                    const res = await createPost(14,"Adrian","Pascu",apiToken.token);
                    console.log(res);
                }
            })}
            {renderTestButton('Change post content', 'change', async () => {
                if(apiToken) {
                    const res = await updatePostContent(3,"nunu",apiToken.token);
                    console.log(res);
                }
            })}
            {renderTestButton('UpVote post', 'up', async () => {
                if(apiToken) {
                    const res = await upVotePost(3,apiToken.token);
                    console.log(res);
                }
            })}
            {renderTestButton('Delete post', 'Delete', async () => {
                if(apiToken) {
                    const res = await deletePost(3,apiToken.token);
                    console.log(res);
                }
            })}
        </Box>
    </Box>
);
};

export default TestPage;
