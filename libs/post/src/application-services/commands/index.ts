import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreatePostcommandHandler } from './create-post/create-post.command-handler';
import { UpdatePostcommandHandler } from './update-post/update-post.command-handler';
import { DeletePostcommandHandler } from './delete-post/delete-post.command-handler';

export const POST_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
	CreatePostcommandHandler,
	UpdatePostcommandHandler,
	DeletePostcommandHandler,
	UpdatePostcommandHandler,
];
