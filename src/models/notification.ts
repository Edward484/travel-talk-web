import { Topic } from './topic';
import { Post } from './post';

export enum NotificationType {
  COMMENT = 0,
  DELETE = 1,
  UPVOTE = 2,
}

export type Notification = {
  id: number;
  type: NotificationType;
  topic: Topic;
  post?: Post;
  extra?: string;
};
