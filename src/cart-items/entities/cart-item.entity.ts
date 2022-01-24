import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CartItem {
  @Field(() => Int)
  id: number;

  @Field()
  productId: number;

  @Field()
  amount: number;
}
