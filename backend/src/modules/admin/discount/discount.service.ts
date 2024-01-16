import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from 'src/entities/discount';
import { Equal, Like, Repository } from 'typeorm';
import { IPaging, Paging } from 'src/helpers/helper';

@Injectable()
export class DiscountService {

	constructor(
		@InjectRepository(Discount)
		private discountRepo: Repository<Discount>
	) { }

	async findAll(paging: IPaging, filters: any) {
		let conditions = await this.buildConditions(filters);

		const [discounts, total] = await this.discountRepo.findAndCount({
			where: conditions,
			order: { created_at: 'DESC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size)
		});

		return { discounts: discounts, meta: new Paging(paging.page, paging.page_size, total) }
	}

	async findById(id: number) {
		return await this.discountRepo.findOneBy({ id: id });
	}

	async findByCode(code: string) {
		return await this.discountRepo.findOneBy({ code: code });
	}

	async create(data: CreateDiscountDto) {
		let newVote = await this.discountRepo.create({
			...data
		});
		await this.discountRepo.save(newVote);
		return newVote;
	}

	async update(id: number, data: UpdateDiscountDto) {
		await this.discountRepo.update(id, data);
		return this.discountRepo.findOneBy({ id: id });
	}

	async delete(id: number): Promise<void> {
		await this.discountRepo.delete(id);
	}

	async buildConditions(filters: any) {
		const conditions: any = {};

		if (filters.id) conditions.id = Equal(filters.id);
		if (filters.name) conditions.name = Like(`%${filters.name}%`);
		if (filters.code) conditions.name = Like(`%${filters.code}%`);
		if (filters.status != null) conditions.status = filters.status;

		return conditions;
	}
}
