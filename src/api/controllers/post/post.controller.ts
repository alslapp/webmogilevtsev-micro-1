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
	Put,
	Patch,
	Delete,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { CurrentUser, ICurrentUser, Public } from '@lib/auth';
import { JwtGuard } from '@lib/auth/guards';
import { PaginationDto } from '@lib/shared/dto';
import { plainToInstance } from 'class-transformer';
import { ApiOkResponsePaginated, ResponseWhithPagination } from '@lib/shared';
import { PostAggregate } from '@lib/post';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostResponse } from './response';

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
	private readonly logger = new Logger(PostController.name);

	constructor(private readonly postFacade: PostFacade) { }

	@ApiOperation({ summary: 'Создание поста' })
	@ApiBearerAuth()
	@ApiOkResponse({ type: PostResponse })
	@Post()
	createPost(@CurrentUser() user: ICurrentUser, @Body() createPostDto: CreatePostDto) {
		return this.postFacade.commands.createPost({
			...createPostDto,
			authorId: user.userId,
		});
	}

	@ApiOperation({ summary: 'Получение поста по его идентификатору' })
	@ApiOkResponse({ type: PostResponse })
	@Public()
	@Get(':id')
	getPostById(@Param('id', ParseUUIDPipe) id: string) {
		return this.postFacade.queries.getOnePost(id);
	}

	@ApiOperation({ summary: 'Получение всех постов' })
	@ApiOkResponsePaginated(PostResponse)
	@Public()
	@Get()
	async getAllPosts(@Query() paginationDto: PaginationDto): Promise<ResponseWhithPagination<PostAggregate>> {
		const pagination = plainToInstance(PaginationDto, paginationDto);
		const [data, total] = await this.postFacade.queries.getAllPosts(pagination);
		return {
			data,
			total,
			...pagination,
		}
	}

	@ApiOperation({ summary: 'Обновление поста' })
	@ApiBearerAuth()
	@ApiOkResponse({ type: PostResponse })
	@Put()
	updatePost(@CurrentUser() user: ICurrentUser, @Body() updatePost: UpdatePostDto) {
		return this.postFacade.commands.updatePost({ ...updatePost, authorId: user.userId });
	}

	@ApiOperation({ summary: 'Установка флага «опубликован» в значение true' })
	@ApiBearerAuth()
	@ApiOkResponse({ type: PostResponse })
	@Patch(':id')
	setPublished(@Param('id', ParseUUIDPipe) id: string) {
		return this.postFacade.commands.setPublishedPost(id);
	}

	@ApiOperation({ summary: 'Удаление поста' })
	@ApiBearerAuth()
	@ApiOkResponse({ type: Boolean })
	@Delete(':id')
	deletePost(@Param('id', ParseUUIDPipe) id: string) {
		return this.postFacade.commands.deletePost(id);
	}
}
