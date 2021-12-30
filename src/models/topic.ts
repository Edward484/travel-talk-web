import { Post } from './post';
import { Category } from './category';

export type Topic = {
  id: number;
  title: string;
  author: { id: number; username: string };
  posts?: Post[];
  description: string;
  category: Category;
};
