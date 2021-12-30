import { Topic } from './topic';

export type Category = {
  id: number;
  name: string;
  topics?: Topic[];
};
