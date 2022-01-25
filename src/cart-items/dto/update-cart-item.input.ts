import { CreateCartItemInput } from './create-cart-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCartItemInput extends PartialType(CreateCartItemInput) {
  @Field()
  @IsNotEmpty()
  id: number;
}
