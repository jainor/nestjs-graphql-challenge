import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const { email } = createUserInput;

    if (await this.prisma.user.count({ where: { email } })) {
      throw new HttpException('email already used', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.user.create({ data: createUserInput });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      data: updateUserInput,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
