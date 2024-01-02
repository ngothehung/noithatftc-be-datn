// @ts-nocheck
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect, useDispatch } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getProducts, showProduct, showProductDetail } from "../../services";
import { VOTE_SERVICE } from "../../services/shop/vote-service";
import { extractIdBySlug } from "../../helpers/func";
import { LoadingList } from "../../components/loading/LoadingList";

const Product = ( { location } ) =>
{
	const { pathname } = location;
	const { id } = useParams();

	const [ productData, setProductData ] = useState( null );
	const [ reviews, setReviews ] = useState( [] );
	const [ productId, setProductId ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ paging, setPaging ] = useState( {
		page: 1,
		page_size: 5,
		total: 0
	} );
	const dispatch = useDispatch();
	useEffect( () =>
	{
		if ( id )
		{
			getDetail( id );
		}
	}, [ id ] );

	const getDetail = async ( id ) =>
	{
		let productIdData = extractIdBySlug( id );
		setProductId( productIdData );
		await showProductDetail( productIdData, setProductData, dispatch );
		await getDataVotes( { ...paging, product_id: productIdData } );
		setLoading( false );
	}


	const getDataVotes = async ( filters ) =>
	{
		try
		{
			const response = await VOTE_SERVICE.getList( filters );
			if ( response?.status === 'success' )
			{
				setPaging( response?.data?.meta );
				setReviews( response?.data?.votes );
			}
		} catch ( error )
		{

		}
	}



	return (
		<Fragment>
			<MetaTags>
				<title>[Cửa hàng Nội thất] | Chi tiết Sản phẩm</title>
				<meta
					name="description"
					content="Product page of flone react minimalist eCommerce template."
				/>
			</MetaTags>

			<BreadcrumbsItem to={ process.env.PUBLIC_URL + "/" }>Trang chủ</BreadcrumbsItem>
			<BreadcrumbsItem to={ process.env.PUBLIC_URL + "/shop" }>
				Sản phẩm
			</BreadcrumbsItem>
			<BreadcrumbsItem to={ process.env.PUBLIC_URL + pathname }>
				{ productData?.name }
			</BreadcrumbsItem>
			<LayoutOne headerTop="visible">
				
				<Breadcrumb />

				<ProductImageDescription
					spaceTopClass="pt-100"
					spaceBottomClass="pb-100"
					loading={loading}
					product={ productData }
				/>

				<ProductDescriptionTab
					spaceBottomClass="pb-90"
					productFullDesc={ productData }
					reviews={ reviews }
					paging={ paging }
					loading={loading}
					setPaging={ setPaging }
					getDataVotes={ getDataVotes }
				/>

				<RelatedProductSlider
					spaceBottomClass="pb-95"
					category={ productData?.category_id }
				/>
			</LayoutOne>


		</Fragment>
	);
};

Product.propTypes = {
	location: PropTypes.object,
};

const mapStateToProps = ( state, ownProps ) =>
{
};

export default connect(  )( Product );
