import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email
        }
      });

      if (userExists) {
        throw new HttpException('User already exists', 400);
      }

      const userData = {
        ...createUserDto,
        password: await hash(createUserDto.password, 10)
      };

      const user = await this.prisma.user.create({
        data: userData
      });

      return {
        id: user.id,
        email: user.email
      };
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findOne(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email
        }
      });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      return user;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async comparePasswords(password: string, hash: string) {
    try {
      return await compare(password, hash);
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
