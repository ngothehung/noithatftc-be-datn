import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Request, Put, } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse, HTTP_STATUS, IPaging, Paging } from 'src/helpers/helper';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';

@Controller('/blog')
@ApiTags(' Blog')
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
