// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesByFilter } from "../../services/categoryService";
import { Categories } from "../../components/Category/Category";
import { buildFilter, timeDelay } from "../../services/common";
import { toggleShowLoading } from "../../redux/actions/common";
import {useHistory} from "react-router-dom";

export const CategoryContainer = () =>
{

	const [ datas, setDatas ] = useState( [] );
	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 20
	} );
	const history = useHistory();
	const [ params, setParams ] = useState( {} );
	const dispatch = useDispatch();

	useEffect( () =>
	{
		getDatasByFilter( paging );
	}, [] );

	const getDatasByFilter = async ( filter ) =>
	{
		filter = buildFilter( filter );
		const paramSearch = new URLSearchParams( filter ).toString();
		history.replace( { search: paramSearch } );
		const rs = await getCategoriesByFilter( filter, dispatch );
		await timeDelay( 1500 );

		dispatch( toggleShowLoading( false ) );
		if ( rs )
		{
			setDatas( rs.categories );
			setPaging( rs.meta );
		}
	}


	return <Categories
		datas={ datas }
		paging={ paging }
		params={ params }
		getDatasByFilter={ getDatasByFilter }
		setParams={ setParams }
		setPaging={ setPaging }
		setDatas={ setDatas }
	/>
};
