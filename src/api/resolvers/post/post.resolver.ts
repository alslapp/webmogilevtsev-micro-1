import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostResponse } from '../responses/post-response';
import { PostFacade } from '@lib/post/application-services';
import { PaginationDto, ResponseWhithPagination } from '@lib/shared';
import { plainToInstance } from 'class-transformer';
import { PostAggregate } from '@lib/post';
import { PaginatedPosts } from '../responses';

@Resolver(() => PostResponse)
export class PostResolver {
	constructor(private readonly postFacade: PostFacade) { }

	@Query(() => PostResponse, { name: 'post' })
	async getPostById(@Args('id') id: string) {
		return this.postFacade.queries.getOnePost(id)
	}

	@Query(() => PaginatedPosts, { name: 'posts' })
	async getPosts(@Args() paginationDto: PaginationDto): Promise<ResponseWhithPagination<PostAggregate>> {
		const pagination = plainToInstance(PaginationDto, paginationDto);
		const posts = await this.postFacade.queries.getAllPosts(pagination);
		return {
			data: posts[0],
			...pagination,
			total: posts[1],
		}
	}
}