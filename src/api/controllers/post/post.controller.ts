import { PostFacade } from '@lib/post/application-services';
import {
	Param,
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	Logger,
	ParseUUIDPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto';
import { CurrentUser, ICurrentUser, Public } from '@lib/auth';
import { JwtGuard } from '@lib/auth/guards';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
	private readonly logger = new Logger(PostController.name);
	constructor(private readonly postFacade: PostFacade) { }

	@Post()
	createPost(@CurrentUser() user: ICurrentUser, @Body() createPostDto: CreatePostDto) {
		return this.postFacade.commands.createPost({
			...createPostDto,
			authorId: user.userId,
		});
	}

	@Public()
	@Get(':id')
	getPostById(@Param('id', ParseUUIDPipe) id: string) {

		this.logger.log({ id })

		return this.postFacade.queries.getOnePost(id);
	}

}
