import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Prisma } from '@prisma/client';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  categoryId: number;

  @Field()
  stock: number;

  @Field(() => GraphQLDecimal)
  price: Prisma.Decimal;

  @Field()
  imageUrl: string;
}
