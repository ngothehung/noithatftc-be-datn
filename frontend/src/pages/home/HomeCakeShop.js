import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import BannerNineteen from "../../wrappers/banner/BannerNineteen";
import TabProductFourteen from "../../wrappers/product/TabProductFourteen";
import BlogFeaturedThree from "../../wrappers/blog-featured/BlogFeaturedThree";
import BannerTwenty from "../../wrappers/banner/BannerTwenty";
import HeroSliderTwentyTwo from "../../wrappers/hero-slider/HeroSliderTwentyTwo";
import { getSlidesByFilters } from "../../services/shop/slider-service";
import { getCategories, getProductsByFilter } from "../../services";
import BannerPage from "../../components/banner/Banner";
import BlogService from "../../services/shop/BlogService";

const HomeCakeShop = () =>
{

	const [ slides, setSlides ] = useState( null );
	const [ productsHot, setProductsHot ] = useState( null );
	const [ products, setProducts ] = useState( null );
	const [ categories, setCategories ] = useState( null );
	const [ blogs, setBlogs ] = useState( [] );
	const [ loadingBlogs, setLoadingBlogs ] = useState( true );
	const [ loadingSlideStatus, setLoadingSlideStatus ] = useState( true );
	const [ loadingCategoryStatus, setLoadingCategoryStatus ] = useState( true );
	const [ loadingProductStatus, setLoadingProductStatus ] = useState( true );
	const [ params, setParams ] = useState( {
		is_hot: null,
		is_sale: null,
		page: 1,
		page_size: 8,
		status: 1
	} );

	const getData = async () => {
		await getSlidesByFilters( { page: 1, page_size: 20, status: 1 }, setSlides );
		await getCategories( { page: 1, page_size: 6, status: 1 }, setCategories );
		await getBlogs({page: 1, page_size: 3, status: 1});
		await productList();
		setLoadingSlideStatus(false);
		setLoadingCategoryStatus(false);
	}

	useState( () =>
	{
		getData();
	}, [] );

	

	useEffect( () =>
	{	
		if(products?.length > 0 && productsHot?.length> 0) {
			setLoadingProductStatus(false);
		}
	}, [ products, productsHot ] );

	const productList = async () => {
		await getProductsByFilter( {...params, order_by: 'created_at', order_value: 'DESC'}, setProducts );
		await getProductsByFilter( {...params, is_hot: 1}, setProductsHot );
		
	}

	const getBlogs = async ( filters ) =>
	{
		const response = await BlogService.getList( filters );
		if ( response )
		{
			setBlogs( response?.blogs );
			setLoadingBlogs(false);
		} else
		{
			setBlogs( [] );
		}

	}

	return (
		<Fragment>
			<MetaTags>
				<title>Home</title>
				<meta
					name="description"
					content="Cửa hàng bán trái cây"
				/>
			</MetaTags>
			<LayoutOne headerTop="visible">
				{/* hero slider */ }
				{ slides && <HeroSliderTwentyTwo slides={ slides } /> }
				{/* tab product */ }

				<BannerPage categories={ categories } loading={loadingCategoryStatus} />
				<TabProductFourteen
					category="cakes"
					loading={loadingProductStatus}
					products={ productsHot }
					setParams={ setParams }
					params={ params }
					spaceBottomClass="pb-100"
					spaceTopClass="pt-100"
					title={ 'Sản phẩm nổi bật' }
				/>
				<TabProductFourteen
					category="cakes"
					loading={loadingProductStatus}
					products={ products }
					setParams={ setParams }
					params={ params }
					spaceBottomClass="pb-100"
					spaceTopClass="pt-100"
					title={ 'Sản phẩm mới' }
				/>
				{/* blog featured */ }
				<BlogFeaturedThree blogs={blogs} loading={loadingBlogs} spaceTopClass="pt-70" spaceBottomClass="pb-70" />
			</LayoutOne>
		</Fragment>
	);
};


export default HomeCakeShop;