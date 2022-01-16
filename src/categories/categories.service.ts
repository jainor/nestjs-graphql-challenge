import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput) {
    return this.prisma.category.create({ data: createCategoryInput });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return this.prisma.category.update({
      data: updateCategoryInput,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} categorie`;
  }
}
