import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent<HTMLElement>, param:number) => {
        console.log(param)
        setAnchorEl(null);
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
                <MenuItem onClick={event => handleClose(event,1)}>Profile Data</MenuItem>
                <MenuItem onClick={event => handleClose(event,2)}>Delete Post</MenuItem>
                <MenuItem onClick={event => handleClose(event,3)}>Logout</MenuItem>
            </Menu>
        </div>
);
}