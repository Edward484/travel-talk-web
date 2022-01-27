import {formControlClasses, Grid, TextField, Button, Box} from "@mui/material";
import React, {useState} from "react";
import SendIcon from '@mui/icons-material/Send';

const CreatePost = () => {
    const [post, setPost] = useState('')
    const [postError, setPostError] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault();
        if(post){
            console.log(post)
        }
        else{
            setPostError(true);
        }
    }

    return(
        <Grid
            item xs={13} sm={10} md={7} xl={7}
            sx={{my:1}}>
            <form noValidate onSubmit={submitHandler}>
                <TextField
                    onChange={(e) => {setPost(e.target.value); setPostError(false)}}
                    variant="outlined"
                    label="Write your post"
                    fullWidth
                    multiline
                    rows={6}
                    color="secondary"
                    error={postError}/>
                <Grid direction="row" style={{display: "flex", justifyContent:"flex-end"}}>
                    <Button
                        type="Submit"
                        color="primary"
                        variant="contained"
                        endIcon={<SendIcon/>}>
                        Post
                    </Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default CreatePost;