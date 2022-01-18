import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthToken } from './entities/auth-token';
import { User } from '../users/entities/user.entity';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import { CreateUserInput } from '../users/dto/create-user.input';

@Resolver(() => [AuthToken, User])
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => AuthToken)
  signIn(@Args('AuthInput') authCredentialsInput: AuthCredentialsInput) {
    return this.authService.SignIn(authCredentialsInput);
  }

  @Mutation(() => User)
  async signUp(@Args('SignUpInput') createUserInput: CreateUserInput) {
    createUserInput.password = await this.authService.hashPassword(
      createUserInput.password,
    );
    return this.usersService.create(createUserInput);
  }
}
