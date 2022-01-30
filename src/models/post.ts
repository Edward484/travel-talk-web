import { Topic } from './topic';

export type Post = {
    postId: number;
    AuthorName: string;
    AuthorId: number;
    createdAt: number;
    content: string;
    topic: Topic;
    imageUrl?: string;
    upVotes: number;
};
export type PostType = {
    postId: number;
    AuthorName: string;
    authorId: number;
    createdAt: Date;
    content: string;
    topicId:number
    imageUrl?: string;
    upVotes: number;
};

export type PostList = {
    posts: PostType[]
}