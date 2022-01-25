import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartItemsService } from './cart-items.service';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemInput } from './dto/create-cart-item.input';
import { UpdateCartItemInput } from './dto/update-cart-item.input';
import { GqlAuthGuard } from 'src/auth/guards/auth-guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UseGuards } from '@nestjs/common';

@Resolver(() => CartItem)
export class CartItemsResolver {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Mutation(() => CartItem)
  @UseGuards(GqlAuthGuard)
  createCartItem(
    @GetUser() user,
    @Args('createCartItemInput') createCartItemInput: CreateCartItemInput,
  ) {
    return this.cartItemsService.create(user.id, createCartItemInput);
  }

  @Query(() => [CartItem], { name: 'cartItems' })
  @UseGuards(GqlAuthGuard)
  findAll(@GetUser() user) {
    return this.cartItemsService.findAllByCart(user.id);
  }

  @Query(() => CartItem, { name: 'cartItem' })
  @UseGuards(GqlAuthGuard)
  findOne(@GetUser() user, @Args('id', { type: () => Int }) id: number) {
    return this.cartItemsService.findOne(user.id, id);
  }

  @Mutation(() => CartItem)
  @UseGuards(GqlAuthGuard)
  updateCartItem(
    @GetUser() user,
    @Args('updateCartItemInput') updateCartItemInput: UpdateCartItemInput,
  ) {
    return this.cartItemsService.update(
      updateCartItemInput.id,
      updateCartItemInput,
    );
  }

  @Mutation(() => CartItem)
  removeCartItem(@Args('id', { type: () => Int }) id: number) {
    return this.cartItemsService.remove(id);
  }
}
