import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Repository } from 'typeorm';
import { Blog } from 'src/entities/blog.entity';
import { IPaging, Paging } from 'src/helpers/helper';

@Injectable()
export class BlogService {
	constructor(
		@InjectRepository(Blog)
		private discountRepo: Repository<Blog>

	) { }

	async findAll(paging: IPaging, filters: any) {
		let conditions = await this.buildConditions(filters);

		const [blogs, total] = await this.discountRepo.findAndCount({
			where: conditions,
			order: { created_at: 'DESC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size)
		});

		return { blogs: blogs, meta: new Paging(paging.page, paging.page_size, total) }
	}

	async findById(id: number) {
		return await this.discountRepo.findOneBy({ id: id });
	}

	async create(data: CreateBlogDto) {
		let newVote = await this.discountRepo.create({
			...data
		});
		await this.discountRepo.save(newVote);
		return newVote;
	}

	async update(id: number, data: UpdateBlogDto) {
		let newVote = await this.discountRepo.create({
			...data
		});
		await this.discountRepo.update(id, newVote);
		return this.discountRepo.findOneBy({ id: id });
	}

	async delete(id: number): Promise<void> {
		await this.discountRepo.delete(id);
	}

	async buildConditions(filters: any) {
		const conditions: any = {};

		if (filters?.id) conditions.id = Equal(filters?.id);
		if (filters?.title) conditions.title = Like(`%${filters?.title}%`);
		if (filters?.status != null) conditions.status = filters?.status;
		if (filters?.menu_id != null) conditions.menu_id = filters?.menu_id;

		return conditions;
	}
}
