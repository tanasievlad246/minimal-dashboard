import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [UsersService, PrismaService, JwtService],
})
export class UsersModule {}
