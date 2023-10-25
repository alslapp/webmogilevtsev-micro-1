import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

@ArgsType()
export class PaginationDto {
	@IsOptional()
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Type(() => Number)
	@Min(0)
	@ApiPropertyOptional({ description: 'Пропуск строк', type: Number })
	@Field(() => Int, { description: 'Пропуск строк' })
	offset = 0;

	@IsOptional()
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Type(() => Number)
	@Max(50)
	@IsPositive()
	@ApiPropertyOptional({ description: 'Количество строк', type: Number })
	@Field(() => Int, { description: 'Количество строк' })
	limit = 15;
}