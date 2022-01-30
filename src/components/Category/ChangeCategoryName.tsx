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
import {changeCategoryName} from "../../api/requests/categories/categories-api-requests";

const ChangeCategoryName : React.FC<{categId: number}> = (props) => {
    const apiToken = useRecoilValue(authTokenAtom);
    const [open, setOpen] = React.useState(false);
    const [categoryName, setCategoryName] = useState('')


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickChange = async () => {
        if(apiToken) {
            const res = await await changeCategoryName(props.categId,categoryName,apiToken.token);
            console.log(res);
        }
        setCategoryName('');
        setTimeout(() => {window.location.reload(); },1000)
        handleClose();
    }

    function categoryNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setCategoryName(e.target.value);
    }


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} color='info'>
                Change category name
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can change the category name
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="category Name"
                        type="text"
                        fullWidth
                        onChange={categoryNameChangeHandler}
                        value={categoryName}
                        variant="outlined"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickChange}>Change</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ChangeCategoryName;