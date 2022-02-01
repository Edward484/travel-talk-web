import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {deletePost} from "../../api/requests/post/post-api-request";
import {useRecoilValue} from "recoil";
import {authTokenAtom} from "../../global/atoms/AuthAtoms";
import {deleteTopicById, updateTopicDescription} from "../../api/requests/topic/topic-api-request";
import {postUserNotification} from "../../api/requests/notification/notification-api-request";
 const FadeMenu: React.FC<{postId:number | undefined, topicId: number|undefined}> = (props) => {
    const apiToken = useRecoilValue(authTokenAtom);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = async (event: React.MouseEvent<HTMLElement>, param: number) => {
        console.log(param)
        if (param == 1) {
            const res =  await updateTopicDescription(props.topicId!,'New desc', apiToken!.token)

            setTimeout(() => {window.location.reload(); },1000)
            setAnchorEl(null);
        }
        if (param == 2) {
            const res = await deletePost(props.postId as number , apiToken!.token );

            setTimeout(() => {window.location.reload(); },1000)
            setAnchorEl(null);
        }
        if (param == 4) {
            const res = await deleteTopicById(props.topicId as number , apiToken!.token );

            setTimeout(() => {window.location.reload(); },1000)
            setAnchorEl(null);
        }
        if (param == 3){
            const res = await postUserNotification(props.postId as number,apiToken!.token)
        }
        handleCloseMouse();

    };
    const handleCloseMouse = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="primary"
                startIcon={<MoreVertIcon/>}
            >
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMouse}
                TransitionComponent={Fade}
                >
                <MenuItem onClick={event => handleClose(event,1)}>Change Content</MenuItem>
                {props.postId!==-1 &&
                    <MenuItem onClick={event => handleClose(event, 2)}>Delete Post</MenuItem>}
                {props.topicId!==-1 &&
                    <MenuItem onClick={event => handleClose(event, 4)}>Delete Topic</MenuItem>}
                <MenuItem onClick={event => handleClose(event,3)}>Send Warning</MenuItem>
            </Menu>
        </div>
);
}

export default FadeMenu;