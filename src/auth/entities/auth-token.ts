import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'access token' })
export class AuthToken {
  @Field()
  accessToken: string;
}
