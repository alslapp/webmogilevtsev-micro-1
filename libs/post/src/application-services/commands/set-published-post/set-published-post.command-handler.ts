import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SetPublishedPostCommand } from './set-published-post-command';
import { PostAggregate } from '@lib/post/domain';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException, Logger } from '@nestjs/common';

@CommandHandler(SetPublishedPostCommand)
export class SetPublishedPostCommandHandler implements ICommandHandler<SetPublishedPostCommand, PostAggregate> {
	private readonly logger = new Logger(SetPublishedPostCommandHandler.name)
	constructor(
		private readonly postRepository: PostRepository,
	) { }

	async execute({ id }: SetPublishedPostCommand): Promise<PostAggregate> {
		const existPost = await this.postRepository.findOne(id).catch(err => {
			this.logger.error(err);
			return null as PostAggregate;
		});

		if (!existPost) {
			throw new BadRequestException(`Post by id ${id} not found!`);
		}

		const postAggregate = PostAggregate.create(existPost);

		postAggregate.setPublished();
		postAggregate.plainToInstance();

		await this.postRepository
			.save(postAggregate)
			.catch(err => {
				throw new BadRequestException(err);
			});
		return postAggregate;
	}

}