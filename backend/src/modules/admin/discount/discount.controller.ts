import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, Request, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS, IPaging, Paging, Response, BaseResponse } from 'src/helpers/helper';
import * as _ from 'lodash';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';

@Controller('admin/discount')
@ApiTags('Admin Discount')
@UseGuards(JwtGuard)
export class DiscountController {
	constructor(private readonly discountService: DiscountService) { }

	@Get('')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getresponse(@Request() req: any) {
		try {
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let response = await this.discountService.findAll(paging, filters);

			return BaseResponse(HTTP_STATUS.success, response, '', 'Successful');

		} catch (e) {
			console.log('get data list ----------------> ', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
	// @Get('show/:id')
	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({ status: 200, description: 'success' })
	// async findById(@Param('id') id: number) {
	// 	try {
	// 		const res = await this.discountService.findById(id);
	// 		if (!res)
	// 			return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'data does not exist');
	// 		else
	// 			return BaseResponse('success', res, '', 'Successful!');
	// 	} catch (e) {
	// 		return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
	// 	}
	// }


	@Get('show/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.discountService.findById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'data does not exist');
			else
				return BaseResponse('success', res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Post('store')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async create(@Request() req: any, @Body() data: CreateDiscountDto) {
		try {
			if (_.isEmpty(data)) throw new BadRequestException({ code: 'F0001' });
			else {
				
				data.created_at = new Date();
				data.updated_at = new Date();
				return BaseResponse(HTTP_STATUS.success, await this.discountService.create(data), '', 'Created successfully!');
			}
		} catch (e) {
			console.log('update category ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Put('update/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async update(@Request() req: any, @Param('id') id: number, @Body() data: UpdateDiscountDto) {
		try {
			const { id: user_id } = req.user;
			const check = await this.discountService.findById(id);
			if (!check) return BaseResponse('fail', {}, 'data does not exist');
			if (!data) throw new BadRequestException({ code: 'F0001' });
			else {
				data.updated_at = new Date();
				return BaseResponse(HTTP_STATUS.success, await this.discountService.update(id, data), '', 'Updated successfully!');
			}
		} catch (e) {
			console.log('update category ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete('delete/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async delete(@Param('id') id: number) {
		try {
			await this.discountService.delete(id);
			return BaseResponse('success', {}, '', 'Deleted successfully!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters: any = {
			id: req.query.id || null,
			name: req.query.name || null,
			code: req.query.code || null,
			
		};
		if(req.query.status != null) {
			filters.status = req.query.status;
		}
		return filters;
	}
}
