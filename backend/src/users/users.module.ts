import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [UsersService],
})
export class UsersModule {}
