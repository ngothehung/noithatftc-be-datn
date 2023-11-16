export const SIDE_BARS = [
	{
		path: '/dashboard',
		icon: 'eva eva-home-outline',
		title: 'Dashboard',
	},
	{
		path: '/product',
		icon: 'eva eva-list',
		title: 'Product',
		children: [
			{
				path: '/product/list',
				title: 'List',
				icon: '',
			},
			{
				path: '/product/create',
				icon: '',
				title: 'Add new',
			},
		]
	},
	{
		path: '/category',
		icon: 'eva eva-star',
		title: 'Category',
		children: [
			{
				path: '/category/list',
				title: 'List ',
				icon: '',
			},
			{
				path: '/category/create',
				icon: '',
				title: 'Add new',
			},
		]
	}
]
