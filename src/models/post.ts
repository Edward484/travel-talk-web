import { Topic } from './topic';

export type Post = {
  id: number;
  author: {
    username: string;
    id: number;
  };
  createdAt: Date;
  content: string;
  topic: Topic;
  imageUrl?: string;
  upVotes: number;
};
