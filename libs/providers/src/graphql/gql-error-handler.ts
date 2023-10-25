import { GraphQLFormattedError } from 'graphql';

export const GqlErrorHandler = (error: GraphQLFormattedError, ...restError) => {
	if ('originalError' in error.extensions) {
		const { message, ...response } = error.extensions['originalError'] as {
			message: string;
			response: Object;
		};
		return {
			message,
			extensions: {
				timestamp: new Date().toISOString(),
				...response,
			}
		}
	}
	return error;
}
