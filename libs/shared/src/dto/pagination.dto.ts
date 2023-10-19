import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
	@IsOptional()
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Min(0)
	@Type(() => Number)
	offset = 0;

	@IsOptional()
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Type(() => Number)
	@IsPositive()
	limit = 15;
}