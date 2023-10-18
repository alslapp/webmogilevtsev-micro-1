import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExeptionsFilter } from './filters';

@Module({
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExeptionsFilter,
		}
	],
})
export class SharedModule { }
