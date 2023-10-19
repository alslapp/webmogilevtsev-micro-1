import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreatePostcommandHandler } from './create-post/create-post.command-handler';

export const POST_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
	CreatePostcommandHandler,
];
