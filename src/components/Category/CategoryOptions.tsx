import * as React from "react";
import {Roles} from "../../models/user";
import CreateNewTopic from "../topic/CreateNewTopic";
import ChangeCategoryName from "./ChangeCategoryName";
import {Button, Grid} from "@mui/material";
import {useRecoilValue} from "recoil";
import {authTokenAtom, currentUserAtom} from "../../global/atoms/AuthAtoms";
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteCategoryById} from "../../api/requests/categories/categories-api-requests";
import colors from "../../lib/theme/colors";

const CategoryOptions: React.FC<{categId: number}>  = (props) => {
    const apiToken = useRecoilValue(authTokenAtom)
    const profile = useRecoilValue(currentUserAtom);

    const deleteCategory = async (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
        const res = await deleteCategoryById(props.categId, apiToken!.token);
        setTimeout(() => {window.location.reload(); },1000)

    }

    return(
        <Grid
        >
            {props.categId && profile?.roles.find(role => role === Roles.Admin) && <CreateNewTopic categId={props.categId }/>}
            {props.categId && profile?.roles.find(role => role === Roles.Admin) && <ChangeCategoryName categId={props.categId}/>}
            <Button
                sx={{color : 'primary.dark' ,  ':hover': { bgcolor: colors.primary, cursor: 'pointer' }, width:"100%"}}
            startIcon={<DeleteIcon/>}
            onClick={deleteCategory}>
                Delete Category
            </Button>
        </Grid>
    )
}
export default CategoryOptions;