import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductInput: CreateProductInput) {
    return this.prisma.product.create({ data: createProductInput });
  }

  findAll(page: number, perPage: number) {
    return this.prisma.product.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return this.prisma.product.update({
      data: updateProductInput,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
