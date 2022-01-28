import React from 'react'
import {Button} from "@mui/material";

const VoteButton: React.FC<{type:number}> = (props) => {

    return(
        <Button>
            {props.type === 1 && `UpVote` }
            {props.type === 2 && `DownVote` }
        </Button>
    )
}

export default VoteButton;