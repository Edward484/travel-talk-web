import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import {Grid} from "@mui/material";

function refreshMessages(): MessageExample[] {
    const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

    return Array.from(new Array(3)).map(
        () => messageExamples[getRandomInt(messageExamples.length)],
    );
}

export default function NotificationsList() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);
    const [messages, setMessages] = React.useState(() => refreshMessages());

    React.useEffect(() => {
        (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
        setMessages(refreshMessages());
    }, [value, setMessages]);

    return (
        <Grid  ref={ref}>
                <List>
                    {messages.map(({ primary, secondary, person }, index) => (
                        <ListItem button key={index + person}>
                            <ListItemText primary={primary} secondary={secondary} />
                        </ListItem>
                ))}
                </List>
            <Paper  >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }} >
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
                </BottomNavigation>
            </Paper>
    </Grid>
);
}

interface MessageExample {
    primary: string;
    secondary: string;
    person: string;
}

const messageExamples: readonly MessageExample[] = [
    {
        primary: 'Brunch this week?',
        secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
        person: '/static/images/avatar/5.jpg',
    },

];