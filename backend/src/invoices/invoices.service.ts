import { Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request
  ) { }

  async getTotal(): Promise<number> {
    const total = await this.prisma.invoice.aggregate({
      _sum: {
        amount: true
      }
    });
    return total._sum.amount;
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    return await this.prisma.invoice.create({
      data: createInvoiceDto
    });
  }

  async findAll() {
    return await this.prisma.invoice.findMany({
      where: {
        user_id: this.request.user.id
      }
    });
  }

  async findOne(invoiceId: number) {
    return await this.prisma.invoice.findUnique({
      where: {
        user_id: this.request.user.id,
        id: invoiceId
      }
    });
  }

  async update(invoiceId: number, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.prisma.invoice.update({
      where: {
        user_id: this.request.user.id,
        id: invoiceId
      },
      data: updateInvoiceDto
    });
  }

  async remove(invoiceId: number) {
    return await this.prisma.invoice.delete({
      where: {
        user_id: this.request.user.id,
        id: invoiceId
      }
    });
  }
}
