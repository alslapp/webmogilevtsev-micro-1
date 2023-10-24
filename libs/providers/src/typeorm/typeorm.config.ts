import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ENTITIES } from '@lib/entities';

config({ path: join(process.cwd(), '.env') }); // process.cwd() - это корень проекта
const configService = new ConfigService();

const options = (): DataSourceOptions => {
	const url = configService.get('DATABASE_URL');
	if (!url) throw new Error('Database url is empty!');
	return {
		url,
		type: 'postgres',
		schema: 'public',
		logging: true, //configService.get('IS_PROD') === 'false',
		entities: ENTITIES,
		migrationsRun: true,
		migrationsTableName: 'migrations',
	}
};

export const appDataSource = new DataSource(options());
