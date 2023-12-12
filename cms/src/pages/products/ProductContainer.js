// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductsByFilter } from "../../services/productService.js";
import { Products } from "../../components/Products/Products.js";
import { buildFilter } from "../../services/common.js";
import { useHistory } from "react-router-dom"

export const ProductContainer = () =>
{

	const [ products, setProducts ] = useState( [] );
	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 20
	} );
	const [ params, setParams ] = useState( {} );
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect( () =>
	{
		getProductsByFilters( paging, setProducts, setPaging );
	}, [] );

	const getProductsByFilters = async ( filter, setProduct, setPage ) =>
	{
		filter = buildFilter( filter );
		const paramSearch = new URLSearchParams( filter ).toString();
		history.replace( { search: paramSearch } );
		await getProductsByFilter( filter, setProducts, setPaging, dispatch );
	}


	return <Products
		products={ products }
		paging={ paging }
		params={ params }
		getProductsByFilters={ getProductsByFilters }
		setParams={ setParams }
		setPaging={ setPaging }
		setProducts={ setProducts }
	/>
};
