import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const gqlCtx = GqlExecutionContext.create(ctx);
  return gqlCtx.getContext().req.user;
});
