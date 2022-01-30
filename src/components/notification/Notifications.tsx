import * as React from 'react';
import { useEffect, useRef } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsList from './NotificationsList';
import useQuery from '../../api/hooks/useQuery';
import { Notification } from '../../models/notification';
import useIsLoggedIn from '../../lib/hooks/auth/useIsLoggedIn';

export default function Notifications() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ref = React.useRef<HTMLDivElement>(null);
  const { data, refetch } = useQuery<Notification[]>(
    '/Notification/current',
    'notification',
  );

  const isLoggedIn = useIsLoggedIn();
  const refreshTimeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (isLoggedIn) {
      //Auto refresh the notifications every 5 minutes
      refreshTimeoutRef.current = setInterval(() => refetch(), 1000 * 60 * 5);
    } else if (refreshTimeoutRef.current) {
      clearInterval(refreshTimeoutRef.current);
    }
  }, [isLoggedIn]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <NotificationsIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <NotificationsList notifications={data ?? []} />
      </Popover>
    </div>
  );
}
