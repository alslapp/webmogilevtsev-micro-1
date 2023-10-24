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
	Query,
} from '@nestjs/common';
import { CreatePostDto } from './dto';
import { CurrentUser, ICurrentUser, Public } from '@lib/auth';
import { JwtGuard } from '@lib/auth/guards';
import { PaginationDto } from '@lib/shared/dto';
import { plainToInstance } from 'class-transformer';
import { ResponseWhithPagination } from '@lib/shared';
import { PostAggregate } from '@lib/post';

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

	@Public()
	@Get()
	async getAllPosts(@Query() paginationDto: PaginationDto): Promise<ResponseWhithPagination<PostAggregate>> {
		const pagination = plainToInstance(PaginationDto, paginationDto);
		const posts = await this.postFacade.queries.getAllPosts(pagination);
		return {
			data: posts[0],
			...pagination,
			total: posts[1],
		}
	}

}
