import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from './delete-post-command';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException, Logger } from '@nestjs/common';

@CommandHandler(DeletePostCommand)
export class DeletePostcommandHandler implements ICommandHandler<DeletePostCommand, boolean> {
	private readonly logger = new Logger(DeletePostcommandHandler.name);

	constructor(
		private readonly postRepository: PostRepository,
	) { }

	async execute({ id }: DeletePostCommand): Promise<boolean> {
		const existPost = await this.postRepository.findOne(id).catch(err => {
			this.logger.error(err);
			return false;
		});

		if (!existPost) {
			throw new BadRequestException(`Post by id ${id} not found!`);
		}

		const isPostDeleted = await this.postRepository
			.delete(id)
			.catch(err => {
				throw new Error(err);
			});

		return isPostDeleted;
	}

}