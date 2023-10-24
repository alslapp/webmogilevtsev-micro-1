import { v4 as uuidv4 } from 'uuid';
import { IPost } from './post.interface';
import { PostServices } from './services';
import { IsUUID, IsString, IsNotEmpty, IsBoolean, validateSync } from 'class-validator';
import { Exclude } from 'class-transformer';
import { DomainError } from '@lib/errors';

export class PostAggregate extends PostServices implements IPost {
	@IsUUID()
	id: string = uuidv4();

	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	message: string;

	@IsUUID()
	@IsNotEmpty()
	authorId: string;

	@IsBoolean()
	@Exclude()
	isPublished = false;

	@IsString()
	createdAt = new Date().toISOString();

	@IsString()
	updatedAt = new Date().toISOString();

	private constructor() {
		super();
	}

	static create(post: Partial<IPost>) {
		const _post = new PostAggregate();
		Object.assign(_post, post);
		_post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;

		const errors = validateSync(_post);
		if (!!errors.length) { // !! - приводит к boolean
			throw new DomainError(errors, 'Post not valid');
		}

		return _post;
	}



}
