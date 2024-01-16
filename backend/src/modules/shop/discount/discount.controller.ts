import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, Request, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HTTP_STATUS, IPaging, Paging, Response, BaseResponse } from 'src/helpers/helper';
import * as _ from 'lodash';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';

@Controller('discount')
@ApiTags('Shop discount')
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


	@Get('show/:code')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('code') code: string) {
		try {
			const res = await this.discountService.findByCode(code);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'data does not exist');
			else
				return BaseResponse('success', res, '', 'Successful!');
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
