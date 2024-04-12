import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards, Inject } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('invoices')
@UseGuards(AuthGuard)
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
  ) { }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    try {
      return await this.invoicesService.create(createInvoiceDto);
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.invoicesService.findAll();
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const invoice = await this.invoicesService.findOne({ id });
      if (!invoice) {
        throw new HttpException('Invoice not found', 404);
      }
      return invoice;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @Post('total')
  async getTotal() {
    try {
      const total = await this.invoicesService.getTotal();
      if (total < 1) {
        throw new HttpException('No invoices found', 404);
      }
      return total;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
