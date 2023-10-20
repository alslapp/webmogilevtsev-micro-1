import { PostFacade } from '@lib/post/application-services';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto';

@Controller('post')
export class PostController {
	constructor(private readonly postFacade: PostFacade) { }

	@Post()
	createPost(@Body() createPostDto: CreatePostDto) {
		return this.postFacade.commands.createPost(createPostDto);
	}
}
