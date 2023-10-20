import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { PostFacade } from '@lib/post/application-services';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto';
import { CurrentUser, ICurrentUser } from '@lib/auth';

@Controller('post')
export class PostController {
	constructor(private readonly postFacade: PostFacade) { }

	@Post()
	createPost(@CurrentUser() user: ICurrentUser, @Body() createPostDto: CreatePostDto) {
		return this.postFacade.commands.createPost({
			...createPostDto,
			authorId: randomStringGenerator()
			// authorId: user.userId,
		});
	}
}
