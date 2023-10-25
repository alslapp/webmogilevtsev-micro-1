import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from '../dto';
import { Type, applyDecorators } from '@nestjs/common';

export class ResponseWhithPagination<T> extends PaginationDto {
	@ApiProperty({ description: 'Всего записей в бд', type: Number })
	total!: number;

	@ApiProperty({ description: 'Набор данных', default: [], isArray: true, items: {} })
	data: T[];
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) => applyDecorators(
	ApiExtraModels(ResponseWhithPagination),
	ApiOkResponse({
		schema: {
			allOf: [
				{ $ref: getSchemaPath(ResponseWhithPagination) },
				{
					properties: {
						data: {
							type: 'array',
							items: { $ref: getSchemaPath(dataDto) }
						}
					},
				}
			],
		}
	})
);
