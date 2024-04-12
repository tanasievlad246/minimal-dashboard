import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, PrismaService, AuthGuard, JwtService],
})
export class InvoicesModule {}
