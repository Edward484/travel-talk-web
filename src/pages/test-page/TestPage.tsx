import React from 'react';
import { Box, Icon, Typography } from '@mui/material';
import colors from '../../lib/theme/colors';
import { useRecoilValue } from 'recoil';
import {authTokenAtom, currentUserAtom} from '../../global/atoms/AuthAtoms';
import { useNavigate } from 'react-router';
import style from '../settings-page/SettingsPage.module.scss';
import useLogin from '../../lib/hooks/auth/useLogin';
import {getUserNotification} from "../../api/requests/notification/notification-api-request";
import { deletePost} from "../../api/requests/post/post-api-request";

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
