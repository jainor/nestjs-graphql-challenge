import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartItemInput {
  @Field(() => Int)
  id: number;

  @Field()
  productId: number;

  @Field()
  amount: number;
}
