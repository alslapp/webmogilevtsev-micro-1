import { IPost } from '@lib/post';
import { ApiProperty } from '@nestjs/swagger';

import { v4 as uuidv4 } from 'uuid';

export class PostResponse implements Omit<IPost, 'isPublished'> {

	@ApiProperty({ description: 'Идентификтор поста', type: String, example: uuidv4() })
	id: string;

	@ApiProperty({ description: 'Заголовок поста', type: String })
	title: string;

	@ApiProperty({ description: 'Текст поста', type: String })
	message: string;

	@ApiProperty({ description: 'Идентификтор автора поста', type: String, example: uuidv4() })
	authorId: string;

	@ApiProperty({ description: 'Дата создания поста', type: String, example: new Date().toISOString() })
	createdAt: string;

	@ApiProperty({ description: 'Дата обновления поста', type: String, example: new Date().toISOString() })
	updatedAt: string;
}
