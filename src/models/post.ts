import { Topic } from './topic';

export type Post = {
    postId: number;
    authorName: string;
    AuthorId: number;
    createdAt: number;
    content: string;
    topic: Topic;
    imageUrl?: string;
    upvoteCount: number;
};
export type PostType = {
    postId: number;
    authorName: string;
    authorId: number;
    createdAt: Date;
    content: string;
    topicId:number
    imageUrl?: string;
    upvoteCount: number;
};

export type PostList = {
    posts: PostType[]
}