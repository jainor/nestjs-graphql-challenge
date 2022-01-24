import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartItemsModule } from './cart-items/cart-items.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      playground: true,
    }),
    CategoriesModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    CartItemsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
