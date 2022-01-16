import { InputType, GraphQLISODateTime, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
