<<<<<<< HEAD
import { UpdatePostDto as IUpdatePostDto } from '@lib/post/application-services/commands/dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePostDto implements IUpdatePostDto {
	@IsUUID()
	id: string;

	@IsUUID()
	authorId: string;

	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	message?: string;
}
=======
import { UpdatePostDto as IUpdatePostDto } from '@lib/post/application-services/commands/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import { v4 as uuidv4 } from 'uuid';

export class UpdatePostDto implements IUpdatePostDto {
	@ApiProperty({ description: 'Идентификтор поста', type: String, example: uuidv4() })
	@IsUUID()
	id: string;

	@IsUUID()
	authorId: string;

	@ApiPropertyOptional({ description: 'Заголовок поста', type: String })
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional({ description: 'Текст поста', type: String })
	@IsOptional()
	@IsString()
	message?: string;
}
>>>>>>> 10
