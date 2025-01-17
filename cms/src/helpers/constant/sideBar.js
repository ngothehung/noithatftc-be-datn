export const SIDE_BARS = [
	{
		path: '/dashboard',
		icon: 'eva eva-home-outline',
		title: 'Trang Quản Trị',
		key: -1 
	},
	{
		path: '/user',
		icon: 'eva eva-people',
		title: 'Người dùng',
		key: -5
		// children: [
		// 	{
		// 		path: '/user/list',
		// 		title: 'list ',
		// 		icon: '',
		// 	},
		// 	// {
		// 	// 	path: '/user/create',
		// 	// 	icon: '',
		// 	// 	title: 'Add new',
		// 	// },
		// ]
	},
	{
		path: '/product',
		icon: 'eva eva-list',
		title: 'Sản phẩm',
		children: [
			{
				path: '/product/list',
				title: 'Danh sách',
				icon: '',
			},
			{
				path: '/product/create',
				icon: '',
				title: 'Thêm mới',
			},
		]
	},
	{
		path: '/category',
		icon: 'eva eva-sun',
		title: 'Danh mục',
		children: [
			{
				path: '/category/list',
				title: 'Danh mục sản phẩm',
				icon: '',
			},
			{
				path: '/category/create',
				icon: '',
				title: 'Thêm mới',
			},
		]
	},

	{
		path: '/discount',
		icon: 'eva eva-flash',
		title: 'Giảm giá',
		children: [
			{
				path: '/discount/list',
				title: 'Danh sách',
				icon: '',
			},
			{
				path: '/discount/create',
				icon: '',
				title: 'Thêm mới',
			},
		]
	},
	{
		path: '/slide',
		icon: 'eva eva-menu',
		title: 'Slide',
		children: [
			{
				path: '/slide/list',
				title: 'Danh sách',
				icon: '',
			},
			{
				path: '/slide/create',
				icon: '',
				title: 'Thêm mới',
			},
		]
	},
	{
		path: '/menu/list',
		icon: 'eva eva-bookmark',
		title: 'Phân loại bài viết',
		children: [
		],
		key: -6
	},
	{
		path: '/blog/list',
		icon: 'eva eva-flag',
		title: 'Bài viết',
		children: [
			
		],	
		key: -7
	},
	{
		path: '/order',
		icon: 'eva eva-grid',
		title: 'Đơn hàng',
		key: -4
	},
	// {
	// 	path: '/setting',
	// 	icon: 'eva eva-settings',
	// 	title: 'Setting',
	// 	children: [
	// 		{
	// 			path: '/setting/role/list',
	// 			title: 'Roles',
	// 			icon: '',
	// 		},
	// 		{
	// 			path: '/setting/permission/list',
	// 			icon: '',
	// 			title: 'Permissions',
	// 		},
	// 	]
	// },

	{
		path: '/reviews',
		icon: 'eva eva-star',
		title: 'Đánh giá',
		key: -2
	},

	{
		path: '/contact',
		icon: 'eva eva-inbox',
		title: 'Liên hệ',
		key: -3
	},
]