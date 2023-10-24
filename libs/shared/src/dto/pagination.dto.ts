import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
	@IsOptional()
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Type(() => Number)
	@Min(0)
	offset = 0;

	@IsOptional()
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Type(() => Number)
	@Max(50)
	@IsPositive()
	limit = 15;
}