import { ObjectType, Field, GraphQLISODateTime, Int } from '@nestjs/graphql';

@ObjectType({ description: 'category' })
export class Category {
  @Field(() => Int, { description: 'id' })
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
