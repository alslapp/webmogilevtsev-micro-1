import {
	Injectable,
	Logger,
} from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PaginationDto } from '@lib/shared/dto';
import {
	IPost,
	PostAggregate,
} from '../domain';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '@lib/entities';
import {
	FindManyOptions,
	Repository,
} from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostAdapter implements PostRepository {
	private readonly logger = new Logger(PostAdapter.name);

	constructor(
		@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
	) { }

	async save(post: IPost): Promise<PostAggregate> {
		const existPost = await this.findOne(post.id);
		if (existPost) {
			const { id, ...toUpdate } = post;
			await this.postRepository.update({ id }, toUpdate);
			return this.findOne(id);
		}
		const saved = await this.postRepository.save(post);
		return PostAggregate.create(saved);
	}

	async findOne(id: string): Promise<PostAggregate> {
		const existPost = await this.postRepository.findOneBy({
			id,
			// isPublished: true,
		}).catch(err => {
			this.logger.error(err);
			return null;
		});

		if (!existPost) {
			// throw new NotFoundException(`Post by ${id} not found`);
			return null;
		}

		return PostAggregate.create(existPost);
	}

	async findAll(pagination: PaginationDto): Promise<[PostAggregate[], number]> {
		const { limit: take, offset: skip } = plainToInstance(PaginationDto, pagination); // получим инстанс класса dto с обработанными/провалидрованными полями
		const options: FindManyOptions<PostEntity> = {
			where: {
				isPublished: true,
			},
			take,
			skip,
			order: {
				createdAt: 'DESC',
			},
		};
		const [data, count] = await this.postRepository.findAndCount(options).catch(err => {
			this.logger.error(err);
			return [[], 0] as [PostAggregate[], number];
		});
		return [data.map(post => PostAggregate.create(post)), count];
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.postRepository.delete(id).catch(err => {
			this.logger.error(err);
			return false;
		});
		return !!result; // !! преобразование к boolean
	}

}