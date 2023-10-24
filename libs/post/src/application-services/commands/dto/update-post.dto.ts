import { IPost } from '@lib/post/domain';

export type UpdatePostDto = Pick<IPost, 'id' | 'authorId'> & Partial<Pick<IPost, 'title' | 'message'>>;
