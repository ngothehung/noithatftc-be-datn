import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { Discount } from 'src/entities/discount';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([
		Discount,
	])
	],
	controllers: [DiscountController],
	providers: [DiscountService]
})
export class DiscountModule { }
