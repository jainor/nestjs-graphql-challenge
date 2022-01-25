import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Pagination } from '../pagination/dto/pagination.input';

import { UnauthorizedException, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from 'src/auth/guards/auth-guard';
import { Roles } from 'src/auth/decorators/rol.decorator';
import { RolesGuard } from 'src/auth/decorators/rol-guard.decorator';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  @Roles('admin', 'manager')
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(@Args('pagination', { nullable: true }) pagination: Pagination) {
    const { page, perPage } = pagination;
    return this.productsService.findAll(page, perPage);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  @Roles('admin', 'manager')
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  @Roles('admin', 'manager')
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
