// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesByFilter } from "../../services/categoryService";
import { Categories } from "../../components/Category/Category";
import { buildFilter, timeDelay } from "../../services/common";
import { toggleShowLoading } from "../../redux/actions/common";
import { SlidesPage } from "../../components/Slide/Slide";
import { useHistory } from "react-router-dom";
import { getDataByFilter } from "../../services/slideService";

export const SlidesContainer = () =>
{

	const [ datas, setDatas ] = useState( [] );
	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 20
	} );
	const [ params, setParams ] = useState( {} );
	const dispatch = useDispatch();
	const history = useHistory()

	useEffect( () =>
	{
		getDatasByFilter( paging );
	}, [] );

	const getDatasByFilter = async ( filter ) =>
	{
		filter = buildFilter( filter );
		const paramSearch = new URLSearchParams( filter ).toString();
		history.replace( { search: paramSearch } );
		const rs = await getDataByFilter( filter, dispatch );
		await timeDelay( 1000 );

		dispatch( toggleShowLoading( false ) );
		if ( rs )
		{
			setDatas( rs.slides );
			setPaging( rs.meta );
		}
	}


	return <SlidesPage
		datas={ datas }
		paging={ paging }
		params={ params }
		getDatasByFilter={ getDatasByFilter }
		setParams={ setParams }
		setPaging={ setPaging }
		setDatas={ setDatas }
	/>
};
