import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PostFacade } from '@lib/post/application-services';
import { CreatePostDto } from '@lib/post/application-services/commands/dto';
import { Injectable, Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConsumerService {
	private readonly logger = new Logger(ConsumerService.name);
	constructor(private readonly postFacade: PostFacade) { }

	@RabbitRPC({
		exchange: 'post',
		routingKey: 'create-post',
		queue: 'create-post',
	})
	private async createPost(post: CreatePostDto) {
		try {
			return await this.postFacade.commands.createPost({
				...post,
				authorId: uuidv4(),
			});
		}
		catch (e) {
			this.logger.error(e);
			return null;
		}
	}
}
