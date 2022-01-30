import { Topic } from './topic';
import { Post } from './post';
import { CategoryTopicApiResponse } from '../api/types/topic';

export enum NotificationType {
  COMMENT = 0,
  DELETE = 1,
  UPVOTE = 2,
}

export type Notification = {
  type: NotificationType;
  topic: CategoryTopicApiResponse;
  post?: Post;
};
