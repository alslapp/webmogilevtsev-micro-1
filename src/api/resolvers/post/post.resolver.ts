import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostResponse } from '../responses/post-response';
import { PostFacade } from '@lib/post/application-services';
import { PaginationDto, ResponseWhithPagination } from '@lib/shared';
import { plainToInstance } from 'class-transformer';
import { PostAggregate } from '@lib/post';
import { PaginatedPosts } from '../responses';
import { CreatePostInput, UpdatePostInput } from '../inputs';

import { v4 as uuidv4 } from 'uuid';

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

	@Mutation(() => PostResponse)
	async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
		return this.postFacade.commands.createPost({
			...createPostInput,
			authorId: uuidv4(),
		});
	}

	@Mutation(() => PostResponse)
	async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
		return this.postFacade.commands.updatePost({
			...updatePostInput,
			authorId: uuidv4(),
		});
	}

	@Mutation(() => PostResponse)
	async setPublishedPost(@Args('id') id: string) {
		return this.postFacade.commands.setPublishedPost(id);
	}

}
