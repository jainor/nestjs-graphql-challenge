import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCartItemInput {
  @Field(() => Int)
  @IsNotEmpty()
  cartId: number;

  @Field()
  @IsNotEmpty()
  productId: number;

  @Field()
  @IsNotEmpty()
  amount: number;
}
