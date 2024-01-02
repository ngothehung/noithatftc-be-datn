// @ts-nocheck
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import * as queryString from 'query-string';
import { buildFilter, getCategories, getCategoryList, getProducts } from "../../services/index";
import { toggleShowLoading } from "../../redux/actions/common";
import { Pagination } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ShopTopbarFilter from '../../wrappers/product/ShopTopbarFilter';

const ShopGridStandard = ( { location, dispatch } ) =>
{
	const [ layout, setLayout ] = useState( 'grid three-column' );
	const [ products, setProducts ] = useState( [] );
	const [ categories, setCategories ] = useState( [] );
	const [ loadingProductStatus, setLoadingProductStatus ] = useState( true );
	const [ params, setParams ] = useState( {
		name: null,
		category_id: null,
		order_by: null,
		order_value: null,
	} );
	const [ paging, setPaging ] = useState( { page: 1, page_size: 20, total: 0 } );

	const { pathname } = location;

	const history = useHistory();


	const getLayout = ( layout ) =>
	{
		setLayout( layout )
	}

	const getProductList = async ( filter ) =>
	{
		dispatch( toggleShowLoading( true ) );
		try
		{
			setLoadingProductStatus(true);
			const params = buildFilter( filter );
			const response = await getProducts( params );
			const paramSearch = new URLSearchParams( params ).toString();
			history.replace( { search: paramSearch } );
			if ( response?.status === 'success' )
			{
				setProducts( response?.data?.products );
				setPaging( { ...response?.data?.meta } );
				setLoadingProductStatus(false);
			}
		} catch ( error )
		{
			console.log( error );
		}
		
		dispatch( toggleShowLoading( false ) );
	}



	useEffect( () =>
	{
		getCategories( null, setCategories );
		if ( window.location.search )
		{
			let cateId = window.location.search.replace( '?category_id=', '' );
			if ( cateId.match( /^[0-9]+$/ ) )
			{
				setParams( { ...params, category_id: Number( cateId ) } )
			}
		}
	}, [] );

	useEffect( () =>
	{

		getProductList( { ...paging, ...params } );
	}, [ params.name, params.category_id, params.order_by, params.order_value ] );


	return (
		<Fragment>

			<BreadcrumbsItem to={ '/' }>Trang chủ</BreadcrumbsItem>
			<BreadcrumbsItem to={ pathname }>Sản phẩm</BreadcrumbsItem>

			<LayoutOne headerTop="visible">
				{/* breadcrumb */ }
				<Breadcrumb />

				<div className="shop-area pt-95 pb-100">
					<div className="container">
						<div className="row">
							<div className="col-12 order-2 order-lg-1">
								{/* shop sidebar */ }
								{/* <ShopSidebar
									categories={ categories }
									params={ params }
									setParams={ setParams }
									sideSpaceClass="mr-30" /> */}
								<ShopTopbarFilter
									categories={ categories }
									params={ params }
									setParams={ setParams }
									getLayout={ getLayout }
									productCount={ paging.total }
									sortedProductCount={ products.length }
								/>
							</div>

							<div className="col-12 order-1 order-lg-2">

								<p>
									Showing { products.length } of { paging.total } result
								</p>
								{/* shop topbar default */ }
								{/* <ShopTopbar
									getLayout={ getLayout }
									params={ params } setParams={ setParams }
									productCount={ paging.total }
									sortedProductCount={ products.length } /> */}

								{/* shop page content default */ }
								<ShopProducts layout={ layout } products={ products } loading={loadingProductStatus} />

								{/* shop product pagination */ }
								{
									paging.total > 0 &&
									<div className="mx-auto d-flex justify-content-center my-4">
										<Pagination
											onChange={ e =>
												getProductList( { page: e, page_size:20, ...params } )
											}
											pageSize={ paging.page_size }
											defaultCurrent={ paging.page }
											total={ paging.total }
										/>
									</div>
								}

							</div>
						</div>
					</div>
				</div>
			</LayoutOne>
		</Fragment>
	)
}

ShopGridStandard.propTypes = {
	location: PropTypes.object,
	products: PropTypes.array,
	dispatch: PropTypes.func
}

const mapStateToProps = state =>
{
}

export default connect( mapStateToProps )( ShopGridStandard );