import { PostAggregate } from '@lib/post/domain';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostQuery } from './get-post.query';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException, Logger } from '@nestjs/common';

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler implements IQueryHandler<GetPostQuery, PostAggregate> {
	private readonly logger = new Logger(GetPostQueryHandler.name);

	constructor(
		private readonly postRepository: PostRepository
	) { }
	async execute({ id }): Promise<PostAggregate | null> {
		const existPost = await this.postRepository.findOne(id).catch(err => {
			this.logger.error(err);
			return null as PostAggregate;
		});
		return PostAggregate.create(existPost);
	}

}