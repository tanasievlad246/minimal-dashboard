import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreateInvoiceDto {
    @IsString()
    vendor_name: string;
    @IsNumber()
    amount: number;
    @IsDate()
    due_date: Date;
    @IsString()
    description: string;
    @IsNumber()
    user_id: number;
    @IsBoolean()
    paid: boolean;
}
