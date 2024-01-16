import { buildFilter, getMethod, postMethod } from '../index';

const MenuService = {

	async getList ( params, setData )
	{
		try
		{
			const response = await getMethod('menu', params );
			if ( response?.status === 'success' )
			{
				setData( response?.data?.menus );
			}
		} catch ( error )
		{
			console.log( error );
		}
	},

	async findById ( id )
	{
		try
		{
			const url = `menu/show/${ id }`;
			const response = await getMethod( url )

			if ( response?.status === "success" )
			{
				return response?.data;
			}
		} catch ( e )
		{
			console.log( '--------------- findById@Error ', e );
			return {};
		}
	},

	async findBySlug ( slug )
	{
		try
		{
			const url = `menu/show/${ slug }`;
			const response = await getMethod( url )

			if ( response?.status === "success" )
			{
				return response?.data;
			}
		} catch ( e )
		{
			console.log( '--------------- findById@Error ', e );
			return {};
		}
	},
}

export default MenuService;
