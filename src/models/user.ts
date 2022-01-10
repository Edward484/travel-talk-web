import { Notification } from './notification';

export enum Roles {
  Admin = 1,
  Mod,
  User,
  CategoryMod,
}

export type User = {
  email: string;
  username: string;
  /**
   *  The ids of the posts of this user
   */

  posts: number[];
  notifications: Notification[];
  newNotifications: number;
  roles: Roles[];
  // An array of the ids of the upvoted posts
  upVotes: number[];
  // A list of the ids this user has mod over
  categoryMod: number[];
};
