import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) { }

  async getTotal() {
    const total = await this.prisma.invoice.aggregate({
      _sum: {
        amount: true
      }
    });
    return total;
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    return await this.prisma.invoice.create({
      data: createInvoiceDto
    });
  }

  async findAll() {
    return await this.prisma.invoice.findMany();
  }

  async findOne(invoiceUniqueInput: Prisma.InvoiceWhereUniqueInput) {
    return await this.prisma.invoice.findUnique({
      where: invoiceUniqueInput
    });
  }

  async update(invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.prisma.invoice.update({
      where: invoiceWhereUniqueInput,
      data: updateInvoiceDto
    });
  }

  async remove(invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput) {
    return await this.prisma.invoice.delete({
      where: invoiceWhereUniqueInput 
    });
  }
}
