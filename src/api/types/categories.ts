import { CategoryTopicApiResponse } from './topic';

export type CategoryApiResponse = {
  categoryId: number;
  name: string;
  topics: CategoryTopicApiResponse[];
};
