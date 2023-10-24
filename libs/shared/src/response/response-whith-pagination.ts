import { PaginationDto } from '../dto';

export class ResponseWhithPagination<T> extends PaginationDto {
	total!: number;

	data: T[];
}