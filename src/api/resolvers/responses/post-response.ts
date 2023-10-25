import { IPost } from '@lib/post';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostResponse implements Omit<IPost, 'isPublished'> {
	@Field(() => ID, { description: 'Идентификтор поста' })
	id: string;

	@Field({ description: 'Заголовок поста' })
	title: string;

	@Field({ description: 'Текст поста' })
	message: string;

	@Field({ description: 'Идентификтор автора поста' })
	authorId: string;

	@Field({ description: 'Дата создания поста' })
	createdAt: string;

	@Field({ description: 'Дата обновления поста' })
	updatedAt: string;
}
