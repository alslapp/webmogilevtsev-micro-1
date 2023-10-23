import { v4 as uuidv4 } from 'uuid';

import { PostFacade } from '@lib/post/application-services';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto';
import { CurrentUser, ICurrentUser } from '@lib/auth';

@Controller('post')
export class PostController {
	constructor(private readonly postFacade: PostFacade) { }

	@Post()
	createPost(@CurrentUser() user: ICurrentUser, @Body() createPostDto: CreatePostDto) {


		const authorId = uuidv4();

		console.log({ authorId });

		return this.postFacade.commands.createPost({
			...createPostDto,
			authorId: uuidv4()
			// authorId: user.userId,
		});
	}
}
