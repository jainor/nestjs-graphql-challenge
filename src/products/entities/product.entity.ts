import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Prisma } from '@prisma/client';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  categoryId: number;

  @Field(() => Int)
  stock: number;

  @Field(() => GraphQLDecimal)
  price: Prisma.Decimal;
}
