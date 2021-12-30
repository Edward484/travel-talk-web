import { Post } from './post';
import { Notification } from './notification';

export enum Roles {
  User = 1,
  CategoryMod,
  Mod,
  Admin,
}

export type User = {
  email: string;
  username: string;
  posts: Post[];
  notifications: Notification[];
  newNotifications: number;
  roles: Roles[];
  // An array of the ids of the upvoted posts
  upVotes: number[];
};
