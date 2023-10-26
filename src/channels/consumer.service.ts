import { CreatePostContract } from '@amqp/amqp-contracts';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PostFacade } from '@lib/post/application-services';
import { Injectable, Logger } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConsumerService {
	private readonly logger = new Logger(ConsumerService.name);
	constructor(private readonly postFacade: PostFacade) { }

	@RabbitRPC({
		exchange: CreatePostContract.queue.exchange.name,
		routingKey: CreatePostContract.queue.routingKey,
		queue: CreatePostContract.queue.queue,
	})
	private async createPost(request: CreatePostContract.request): Promise<CreatePostContract.response> {
		const { payload: post, ...requestMessage } = request;
		try {
			const createdPost = await this.postFacade.commands.createPost({
				...post,
			});
			return {
				...requestMessage,
				payload: createdPost
			}
		}
		catch (e) {
			this.logger.error(e);
			return {
				...requestMessage,
				payload: null,
				error: this.errorHandler(e),
			};
		}
	}

	private errorHandler(error: any) {
		return {
			code: error?.name || 'error',
			message: error?.message || JSON.stringify(error)
		}
	}
}
