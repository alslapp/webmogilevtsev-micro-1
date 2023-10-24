import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreatePostcommandHandler } from './create-post/create-post.command-handler';
import { UpdatePostcommandHandler } from './update-post/update-post.command-handler';
import { DeletePostcommandHandler } from './delete-post/delete-post.command-handler';
import { SetPublishedPostCommandHandler } from './set-published-post/set-published-post.command-handler';

export * from './create-post/create-post-command';
export * from './create-post/create-post.command-handler';

export * from './update-post/update-post-command';
export * from './update-post/update-post.command-handler';

export * from './delete-post/delete-post-command';
export * from './delete-post/delete-post.command-handler';

export * from './set-published-post/set-published-post-command';
export * from './set-published-post/set-published-post.command-handler';

export const POST_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
	CreatePostcommandHandler,
	UpdatePostcommandHandler,
	DeletePostcommandHandler,
	SetPublishedPostCommandHandler,
];
