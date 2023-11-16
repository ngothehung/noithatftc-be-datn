import axios from "axios";
import { toggleShowLoading } from "../redux/actions/common";
import { deleteMethod, getMethod, postMethod, putMethod } from "./apiService";
import { buildFilter, timeDelay } from "./common";
import { message } from "antd";
import uploadApi from "./upload";

export const getProducts = async ( params ) =>
{
	let filter = buildFilter( params );
	return await getMethod( '/cms/product/lists', filter );
}

export const showProduct = async ( id, params ) =>
{
	return await getMethod( `/cms/product/show/${ id }`, params );
}

export const Product = {
	async create ( data )
	{
		return await postMethod( `/cms/product/store`, data );
	},

	async update ( id, data )
	{
		return await putMethod( `/cms/product/update/${ id }`, data );
	},

	async delete ( id )
	{
		return await deleteMethod( `/cms/product/${ id }` );
	}
}


export const showProductDetail = async ( productId, setProductData ) =>
{
	try
	{
		const response = await showProduct( productId );
		if ( response?.status === 'success' )
		{
			setProductData( response?.data );
		} else
		{
			setProductData( null );
		}
	} catch ( error )
	{
		console.log( error );
		setProductData( null );
	}
}

export const getProductsByFilter = async ( params, setProducts, setPaging, dispatch ) =>
{
	try
	{
		dispatch( toggleShowLoading( true ) )
		const response = await getProducts( params );
		await timeDelay( 2000 );
		if ( response?.status === 'success' )
		{
			setProducts( response?.data.products );
			setPaging( response?.data.meta );

		} else
		{
			setProducts( [] );
		}
		dispatch( toggleShowLoading( false ) )
	} catch ( error )
	{
		console.log( error );
		setProducts( [] );
		dispatch( toggleShowLoading( false ) )

	}

}

export const submitFormProduct = async ( id = null, files, e, dispatch, history ) =>
{
	try
	{
		dispatch( toggleShowLoading( true ) );
		let avatar  = await uploadApi.uploadFile(files);
		let fileImg = await uploadApi.uploadMultiFile(files);
		await timeDelay( 2000 );
		// return;
		let formValue = { ...e };

		delete formValue.image;
		console.log(avatar);
		formValue.avatar = avatar;
		formValue.products_images = fileImg;
		formValue.hot = formValue.hot ? 1 : -1;
		formValue.category_id = Number( formValue.category_id );
		formValue.price = Number( formValue.price );
		formValue.number = Number( formValue.number );
		let response;
		if ( id )
		{
			response = await Product.update( id, formValue );
		} else
		{
			response = await Product.create( formValue );
		}
		if ( response?.status === 'success' )
		{
			message.success( `${id && 'Update'|| 'Create'} product successfully!`);
			history.push( '/product' );
		} else if ( response?.status === 'fail' && response?.data )
		{
			let error = Object.entries( response?.data ) || [];
			if ( error.length > 0 )
			{
				let messageError = error.reduce( ( newMessage, item ) =>
				{
					newMessage[ `${ item[ 0 ] }` ] = item[ 1 ][ 0 ];
					return newMessage
				}, {} );
				message.error( messageError )
			}
		} else
		{
			message.error( response.message || 'Error! Please try again' );
		}
		dispatch( toggleShowLoading( false ) );
	} catch ( error )
	{
		message.error( error.message );
		dispatch( toggleShowLoading( false ) );
	}
}
