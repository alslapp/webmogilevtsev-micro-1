import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostResponse } from '../responses/post-response';
import { PostFacade } from '@lib/post/application-services';
import { PaginationDto, ResponseWhithPagination } from '@lib/shared';
import { plainToInstance } from 'class-transformer';
import { PostAggregate } from '@lib/post';
import { PaginatedPosts } from '../responses';
import { CreatePostInput, UpdatePostInput } from '../inputs';
import { GqlCurrentUser, ICurrentUser, Public } from '@lib/auth';
import { UseGuards } from '@nestjs/common';
import { GqlGuard } from '@lib/auth/guards';

@UseGuards(GqlGuard)
@Resolver(() => PostResponse)
export class PostResolver {
	constructor(private readonly postFacade: PostFacade) { }

	@Public()
	@Query(() => PostResponse, { name: 'post' })
	async getPostById(@Args('id') id: string) {
		return this.postFacade.queries.getOnePost(id)
	}

	@Public()
	@Query(() => PaginatedPosts, { name: 'posts' })
	async getPosts(@Args() paginationDto: PaginationDto): Promise<ResponseWhithPagination<PostAggregate>> {
		const pagination = plainToInstance(PaginationDto, paginationDto);
		const [data, total] = await this.postFacade.queries.getAllPosts(pagination);
		return {
			data,
			total,
			...pagination,
		}
	}

	@Mutation(() => PostResponse)
	async createPost(@GqlCurrentUser() currentUser: ICurrentUser, @Args('createPostInput') createPostInput: CreatePostInput) {
		return this.postFacade.commands.createPost({
			...createPostInput,
			authorId: currentUser.userId,
		});
	}

	@Mutation(() => PostResponse)
	async updatePost(@GqlCurrentUser() currentUser: ICurrentUser, @Args('updatePostInput') updatePostInput: UpdatePostInput) {
		return this.postFacade.commands.updatePost({
			...updatePostInput,
			authorId: currentUser.userId,
		});
	}

	@Mutation(() => PostResponse)
	async setPublishedPost(@Args('id') id: string) {
		return this.postFacade.commands.setPublishedPost(id);
	}

	@Mutation(() => Boolean)
	async deletePost(@Args('id') id: string) {
		return this.postFacade.commands.deletePost(id);
	}

}
