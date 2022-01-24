import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class Pagination {
  @Field({ nullable: true })
  @IsInt()
  @IsPositive()
  readonly page: number = 1;

  @Field({ nullable: true })
  @IsInt()
  @IsPositive()
  readonly perPage: number = 30;
}
