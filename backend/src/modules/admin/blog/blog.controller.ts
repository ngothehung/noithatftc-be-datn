import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Request, Put, } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse, HTTP_STATUS, IPaging, Paging } from 'src/helpers/helper';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';

@Controller('admin/blog')
@ApiTags('Admin Blog')
@UseGuards(JwtGuard)
export class BlogController {

	constructor(private readonly blogService: BlogService) { }

	@Get('')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findAll(@Request() req: any) {
		try {
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let response: any = await this.blogService.findAll(paging, filters);

			return BaseResponse(HTTP_STATUS.success, response, '', 'Successful');

		} catch (e) {
			console.log('getlist ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('show/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getCategoryById(@Param('id') id: number) {
		try {
			const res = await this.blogService.findById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Blog không tồn tại');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Post('store')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async createCategory(@Body() createCate: CreateBlogDto) {
		try {
			if (_.isEmpty(createCate)) throw new BadRequestException({ code: 'F0001' });
			else {
				createCate.created_at = new Date();
				createCate.updated_at = new Date();
				return BaseResponse(
					HTTP_STATUS.success,
					await this.blogService.create(createCate),
					'',
					'Created successfully!'
				);
			}
		} catch (e) {
			console.log('create-------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Put('update/:id')
	@HttpCode(HttpStatus.OK)
	// @UseGuards(RoleGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async updateCategory(@Param('id') cateId: number, @Body() updateCate: UpdateBlogDto) {
		try {
			const check = await this.blogService.findById(cateId);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Blog không tồn tại');
			if (_.isEmpty(updateCate)) throw new BadRequestException({ code: 'F0001' });
			else {
				updateCate.updated_at = new Date();
				return BaseResponse(HTTP_STATUS.success, await this.blogService.update(cateId, updateCate), '', 'Updated successfully!');
			}
		} catch (e) {
			console.log('update---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete('delete/:id')
	@HttpCode(HttpStatus.OK)
	// @UseGuards(RoleGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteCategory(@Param('id') id: number) {
		try {
			let data = await this.blogService.findById(id);

			if (!data) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Blog không tồn tại!');
			} else {
				await this.blogService.delete(id);
				return BaseResponse(HTTP_STATUS.success, {}, '', 'Deleted successfully!');
			}
		} catch (e) {
			console.log(e);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			title: req.query.title || null,
			status: req.query.status || null,
			menu_id: req.query.menu_id || null,
		};
		return filters;
	}
}
