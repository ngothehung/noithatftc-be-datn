// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserCpn } from "../../components/User/User";
import { USER_SERVICE } from "../../services/userService";
import { buildFilter } from "../../services/common";
import { useHistory } from "react-router-dom"


export const UserContainer = () =>
{

	const [ listData, setListData ] = useState( [] );
	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 20
	} );
	const [ params, setParams ] = useState( {} );
	const dispatch = useDispatch();
	const history = useHistory();


	useEffect( () =>
	{
		getListData(paging);
	}, [] );

	const getListData = async ( filter ) =>
	{
		filter = buildFilter( filter );
		const paramSearch = new URLSearchParams( filter ).toString();
		history.replace( { search: paramSearch } );
		const response = await USER_SERVICE.getListData( filter, dispatch );
		if(response) {
			setListData(response.users);
			setPaging(response.meta);
		} else {
			setListData([]);
		}
	}


	return <UserCpn
		listData={ listData }
		paging={ paging }
		params={ params }
		getListData={ getListData }
		setParams={ setParams }
		setPaging={ setPaging }
		setListData={ setListData }
	/>
};
