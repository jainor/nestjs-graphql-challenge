import { Injectable } from '@nestjs/common';
import { CreateCartItemInput } from './dto/create-cart-item.input';
import { UpdateCartItemInput } from './dto/update-cart-item.input';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createCartItemInput: CreateCartItemInput) {
    const cartId = userId;

    return this.prisma.shoppingCartItem.create({
      data: {
        ...createCartItemInput,
        cartId,
      },
    });
  }

  findAllByCart(userId: number) {
    const cartId = userId;
    return this.prisma.shoppingCartItem.findMany({
      where: { cartId },
    });
  }

  async findOne(userId: number, id: number) {
    const cartId = userId;
    const data = await this.prisma.shoppingCartItem.findUnique({
      where: { id },
    });
    if (data.cartId != cartId) {
      throw new HttpException(
        'cart does not belong to current user',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return data;
  }

  update(id: number, updateCartItemInput: UpdateCartItemInput) {
    return this.prisma.shoppingCartItem.update({
      data: updateCartItemInput,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
