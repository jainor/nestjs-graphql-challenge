import { InputType, Int, Field } from '@nestjs/graphql';
import { RoleType } from '@prisma/client';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
