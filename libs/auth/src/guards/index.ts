import { GqlGuard } from './gql.guard';
import { JwtGuard } from './jwt.guard';
export const GUARDS = [JwtGuard, GqlGuard];

export * from './jwt.guard';
export * from './gql.guard';
