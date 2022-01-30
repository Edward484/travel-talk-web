import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Grid, ListItemButton, ListItemText } from '@mui/material';
import { Notification, NotificationType } from '../../models/notification';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationsList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  const [value, setValue] = React.useState(0);

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case NotificationType.COMMENT: {
        return `Someone commented on your topic: ${notification.topic.title}`;
      }
      case NotificationType.DELETE: {
        return `Your post got deleted: ${(
          notification.post?.content ?? ''
        ).substring(0, 15)}${
          (notification.post?.content ?? '').length > 15 ? '...' : ''
        }`;
      }
      case NotificationType.UPVOTE: {
        return `You got an upvote to your post: ${(
          notification.post?.content ?? ''
        ).substring(0, 15)}${
          (notification.post?.content ?? '').length > 15 ? '...' : ''
        }`;
      }
    }
  };

  return (
    <Grid>
      <List>
        {notifications.map((notification, index) => (
          <ListItem>
            <ListItemButton
              component="a"
              href={`/${notification.topic.categoryId}/${notification.topic.topicId}`}
            >
              <ListItemText primary={getNotificationText(notification)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default NotificationsList;
