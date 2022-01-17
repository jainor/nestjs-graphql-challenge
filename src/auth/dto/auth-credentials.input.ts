import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class AuthCredentialsInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
