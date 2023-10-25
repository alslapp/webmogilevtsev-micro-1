import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

export const apolloDriverConfig: ApolloDriverConfig = {
	driver: ApolloDriver,
	autoSchemaFile: join(process.cwd(), 'libs', 'providers', 'src', 'graphql', 'schema.qgl'),
	sortSchema: true,
	context: ({ req, res }) => ({ req, res })
};
