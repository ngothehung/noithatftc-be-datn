import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Permission } from 'src/entities/permission.entity';
import { PermissionDto } from '../dtos/permission.dto';
import { Paging } from 'src/helpers/helper';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>
    ) {
    }
    async getListsPermissions(filter: any)
    {
        const condition: any = {};
        if (filter.group) condition.group = filter.group;
        if (filter.id) condition.id = filter.id;
        if (filter.name) condition.name = Like('%' + filter.name +'%');

        const [rs, total] = await this.permissionRepository.findAndCount({
            where: condition,
            take: filter.page_size,
            skip: (filter.page - 1) * filter.page_size
        });
		return {
			permissions: rs,
			meta: new Paging(filter.page, filter.page_size, total)
		};
    }

    async create(permissionData: PermissionDto)
    {
        const newData = await this.permissionRepository.create(permissionData);
        return await this.permissionRepository.save(newData);
    }

	async seed() {
		console.log("seed");
		const permissions = [
			{
                name : 'Full Quyền',
                description: 'Full Quyền',
                group: 'ADMIN',
                guard_name: 'SUPER_ADMIN'
            },
			{
                name : 'Dashboard',
                description: 'Dashboard',
                group: 'Dashboard',
                guard_name: '/statistical/'
            },
            {
                name : 'Danh sách Đơn hàng',
                description: 'Danh sách Đơn hàng',
                group: 'ORDER',
                guard_name: '/order/'
            },
            {
                name : 'Chi tiết Đơn hàng',
                description: 'Chi tiết đơn hàng',
				group: 'ORDER',
                guard_name: '/order/show'
            },
            {
                name : 'Cập nhật Đơn hàng',
                description: 'Cập nhật đơn hàng',
				group: 'ORDER',
                guard_name: '/order/update'
            },
            {
                name : 'Danh sách Sản phẩm',
				group: 'PRODUCT',
                description: 'Danh sách sản phẩm',
                guard_name: '/product/'
            },
            {
                name : 'Chi tiết Sản phẩm',
				group: 'PRODUCT',
                description: 'Chi tiết sản phẩm',
                guard_name: '/product/show'
            },
            {
                name : 'Add Sản phẩm',
				group: 'PRODUCT',
                description: 'Thêm mới sản phẩm',
                guard_name: '/product/store'
            },
            {
                name : 'Cập nhật Sản phẩm',
				group: 'PRODUCT',
                description: 'Cập nhật sản phẩm',
                guard_name: '/product/update'
            },
            {
                name : 'Danh sách Phân loại sản phẩm',
				group: 'CATEGORY',
                description: 'Danh sách phân loại',
                guard_name: '/category/'
            },
            {
                name : 'Chi tiết Phân loại sản phẩm',
				group: 'CATEGORY',
                description: 'Chi tiết phân loại',
                guard_name: '/category/show'
            },
            {
                name : 'Add Phân loại sản phẩm',
				group: 'CATEGORY',
                description: 'Thêm mới Phân loại',
                guard_name: '/category/store'
            },
            {
                name : 'Cập nhật Phân loại sản phẩm',
				group: 'CATEGORY',
                description: 'Cập nhật phân loại',
                guard_name: '/category/update'
            },
            {
                name : 'Danh sách Slide',
				group: 'SLIDE',
                description: 'Danh sách slide',
                guard_name: '/slide/'
            },
            {
                name : 'Chi tiết Slide',
				group: 'SLIDE',
                description: 'Chi tiết slide',
                guard_name: '/slide/show'
            },
            {
                name : 'Add Slide',
				group: 'SLIDE',
                description: 'Thêm mới slide',
                guard_name: '/slide/store'
            },
            {
                name : 'Cập nhật Slide',
				group: 'SLIDE',
                description: 'Cập nhật slide',
                guard_name: '/slide/update'
            },


			{
                name : 'Danh sách Giảm giá',
				group: 'DISCOUNT',
                description: 'Danh sách giảm giá',
                guard_name: '/discount/'
            },
            {
                name : 'Chi tiết Giảm giá',
				group: 'DISCOUNT',
                description: 'Chi tiết Giảm giá',
                guard_name: '/discount/show'
            },
            {
                name : 'Add Giảm giá',
				group: 'DISCOUNT',
                description: 'Thêm mới Giảm giá',
                guard_name: '/discount/store'
            },
            {
                name : 'Cập nhật Giảm giá',
				group: 'DISCOUNT',
                description: 'Cập nhật Giảm giá',
                guard_name: '/discount/update'
            },

			
            {
                name : 'Danh sách Role',
				group: 'ROLE',
                description: 'Danh sách Role',
                guard_name: '/role/'
            },
            {
                name : 'Chi tiết Role',
				group: 'ROLE',
                description: 'Chi tiết Role',
                guard_name: '/role/show'
            },
            {
                name : 'Add Role',
				group: 'ROLE',
                description: 'Thêm mới Role',
                guard_name: '/role/store'
            },
            {
                name : 'Cập nhật Role',
				group: 'ROLE',
                description: 'Cập nhật Role',
                guard_name: '/role/update'
            },
            {
                name : 'Danh sách permission',
				group: 'PERMISSION',
                description: 'Danh sách permission',
                guard_name: '/permission/'
            },
            // {
            //     name : 'Chi tiết permission',
            //     description: 'how permission',
            //     guard_name: '/permission'
            // },
            // {
            //     name : 'Add permission',
            //     description: 'Thêm mới permission',
            //     guard_name: '/permission/store'
            // },
            // {
            //     name : 'Cập nhật permission',
            //     description: 'Cập nhật permission',
            //     guard_name: '/permission/update'
            // },
            // {
            //     name : 'Danh sách Contact',
			// 	   group: 'CONTACT',
            //     description: 'Danh sách contact',
            //     guard_name: '/contact/'
            // },
            // {
            //     name : 'Chi tiết Contact',
			// 	   group: 'CONTACT',
            //     description: 'Chi tiết contact',
            //     guard_name: '/contact/show'
            // },
            
            {
                name : 'Danh sách user',
				group: 'USER',
                description: 'Danh sách user',
                guard_name: '/user/'
            },
            {
                name : 'Chi tiết user',
				group: 'USER',
                description: 'Chi tiết user',
                guard_name: '/user/show'
            },
            {
                name : 'Add user',
				group: 'USER',
                description: 'Thêm mới user',
                guard_name: '/user/store'
            },
            {
                name : 'Cập nhật user',
                description: 'Cập nhật user',
				group: 'USER',
                guard_name: '/user/update'
            },
			{
                name : 'Danh sách reviews',
				group: 'VOTE',
                description: 'Danh sách reviews',
                guard_name: '/vote'
            },
			{
                name : 'Chi tiết reviews',
				group: 'VOTE',
                description: 'Chi tiết vote',
                guard_name: '/vote/show'
            },
			{
                name : 'Cập nhật reviews',
				group: 'VOTE',
                description: 'Cập nhật reviews',
                guard_name: '/vote/update'
            },
			{
                name : 'Xóa reviews',
				group: 'VOTE',
                description: 'Xóa reviews',
                guard_name: '/vote/delete'
            },


			{
                name : 'Danh sách Blog',
				group: 'BLOG',
                description: 'Danh sách blog',
                guard_name: '/blog'
            },
			{
                name : 'Chi tiết blog',
				group: 'BLOG',
                description: 'Chi tiết blog',
                guard_name: '/blog/show'
            },
			{
                name : 'Tạo blog',
				group: 'BLOG',
                description: 'Tạo blog',
                guard_name: '/blog/store'
            },
			{
                name : 'Cập nhật blog',
				group: 'BLOG',
                description: 'Cập nhật blog',
                guard_name: '/blog/update'
            },
			{
                name : 'Xóa blog',
				group: 'BLOG',
                description: 'Xóa blog',
                guard_name: '/blog/delete'
            },
			{
                name : 'Danh sách phân loại blog',
				group: 'MENU',
                description: 'Danh sách phân loại blog',
                guard_name: '/menu'
            },
			{
                name : 'Chi tiết phân loại blog',
				group: 'MENU',
                description: 'Chi tiết phân loại blog',
                guard_name: '/menu/show'
            },
			{
                name : 'Tạo phân loại blog',
				group: 'MENU',
                description: 'Tạo phân loại blog',
                guard_name: '/menu/store'
            },
			{
                name : 'Cập nhật phân loại blog',
				group: 'MENU',
                description: 'Cập nhật phân loại blog',
                guard_name: '/menu/update'
            },
			{
                name : 'Xóa phân loại blog',
				group: 'MENU',
                description: 'Xóa phân loại blog',
                guard_name: '/menu/delete'
            },
			
        ]

        for(let i = 0 ; i < permissions.length ; i ++) {
            let permission = permissions[i];
            let check = await this.permissionRepository.findOne({
				where: {
					guard_name: permission.guard_name
				}
			});
            console.log('------- CHECK: =>  ', check);
            if (!check) {
                const newData = this.permissionRepository.create({...permission, created_at: new Date(), updated_at: new Date()});
                await this.permissionRepository.save(newData);
                console.log('------------- NEW PERMISSION: ', permission);
            } else {
				await this.permissionRepository.update(check?.id, {...permission, created_at: new Date(), updated_at: new Date()})
			}
        }
	}

    async show(id: number)
    {
        return await this.permissionRepository.findOne({
            where: {
                id
            },
            relations: ['roles']
        });
    }

    async update(id: number, permissionData: any)
    {
         await this.permissionRepository.createQueryBuilder()
            .update(Permission)
            .set({...permissionData, updated_at: new Date()})
            .where("id = :id", { id: id })
            .execute();

         return await this.show(id);
    }
}
