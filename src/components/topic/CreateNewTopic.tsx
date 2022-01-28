import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {createPost} from "../../api/requests/post/post-api-request";
import {useRecoilValue} from "recoil";
import {authTokenAtom} from "../../global/atoms/AuthAtoms";
import {createTopic} from "../../api/requests/topic/topic-api-request";

const CreateNewTopic : React.FC<{categId: number}> = (props) => {
    const apiToken = useRecoilValue(authTokenAtom);
    const [open, setOpen] = React.useState(false);
    const [topicName, setTopicName] = useState('')
    const [topicDescription, setTopicDescription] = useState('')


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickCreate = async () => {
        if(apiToken) {
            const res = await createTopic(topicName,topicDescription,props.categId,apiToken.token);
            console.log(res);
        }
        setTopicName('');
        setTopicDescription('');
        setTimeout(() => {window.location.reload(); },1000)
        handleClose();
    }

    function topicNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTopicName(e.target.value);
    }

    function topicDescriptionChangeHandler(e : React.ChangeEvent<HTMLInputElement>) {
        setTopicDescription(e.target.value);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
        Create new Topic
            </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Topic</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here you will input the details for the new topic that will appear in this category
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Topic Name"
                    type="text"
                    fullWidth
                    onChange={topicNameChangeHandler}
                    value={topicName}
                    variant="outlined"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Topic Description"
                    type="email"
                    fullWidth
                    onChange={topicDescriptionChangeHandler}
                    value={topicDescription}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClickCreate}>Create</Button>
            </DialogActions>
        </Dialog>
        </div>
);
}
export default CreateNewTopic;