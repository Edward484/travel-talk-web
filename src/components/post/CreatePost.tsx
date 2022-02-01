import {formControlClasses, Grid, TextField, Button, Box} from "@mui/material";
import React, {useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {createPost} from "../../api/requests/post/post-api-request";
import {useRecoilValue} from "recoil";
import {authTokenAtom} from "../../global/atoms/AuthAtoms";

const CreatePost: React.FC<{topicId:string | undefined}> = (props) => {
    const apiToken = useRecoilValue(authTokenAtom);

    const [post, setPost] = useState<string>('')
    const [urlImg, setUrlImg] = useState('')
    const [postError, setPostError] = useState<boolean>(false)
    const [file, setFile] = useState<string>('');
    const types = ['image/png', 'image/jpeg'];

    const submitHandler = async (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        if (post) {
            console.log(post);
            console.log(file);
            //call api
            if (apiToken) {
                const res = await createPost(parseInt(props.topicId as string), post, urlImg, apiToken.token);
            }
            setPost('');
            setFile('');
        } else {
            setPostError(true);
        }
        setTimeout(() => {window.location.reload(); },1000)
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        let selected = e.target.files?.[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected.toString());
        } else {
            setFile('');
        }
    };

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
                    value={post}
                    multiline
                    rows={6}
                    color="secondary"
                    error={postError}/>
                <Box style={{display:'flex', justifyContent:'space-between' }}>
                    <TextField
                        placeholder='Put the link of the photo'
                        onChange={(e) => {setUrlImg(e.target.value)}}>

                    </TextField>
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    component="label" >*/}
                    {/*    Upload File*/}
                    {/*    <input*/}
                    {/*        onChange={handleChange}*/}
                    {/*        type="file"*/}
                    {/*        hidden*/}
                    {/*    />*/}
                    {/*</Button>*/}
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon/>}>
                        Post
                    </Button>
                </Box>
            </form>
        </Grid>
    )
}

export default CreatePost;