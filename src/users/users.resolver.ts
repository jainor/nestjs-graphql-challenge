import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/auth-guard';
import { Roles } from 'src/auth/decorators/rol.decorator';
import { RolesGuard } from 'src/auth/decorators/rol-guard.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  @Roles('admin', 'manager', 'client')
  @UseGuards(GqlAuthGuard, RolesGuard)
  findMe(@GetUser() user) {
    return this.usersService.findOneByEmail(user.email);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @GetUser() user,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(user.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
