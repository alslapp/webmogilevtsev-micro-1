import { PaginationDto } from '@lib/shared/dto';
import { IPost, PostAggregate } from '../domain';

export abstract class PostRepository {
	abstract save(post: IPost): Promise<PostAggregate>;
	abstract findOne(id: string): Promise<PostAggregate | null>;
	abstract findAll(pagination: PaginationDto): Promise<[[PostAggregate], number]>; // так возвращает TypeORM
	abstract delete(id: string): Promise<boolean>;
}
