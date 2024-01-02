import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MenuService from "../../services/shop/MenuService";
import { extractIdBySlug } from "../../helpers/func";
import BlogService from "../../services/shop/BlogService";
import { INIT_PAGING } from "../../helpers/constant";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import { Pagination } from "antd";

const BlogStandard = ( { location } ) =>
{
	const { pathname } = location;
	const params = useParams();
	const dispatch = useDispatch();
	const [ menu, setMenu ] = useState( null );
	const [ paging, setPaging ] = useState( INIT_PAGING );
	const [ blogs, setBlogs ] = useState( [] );


	useEffect( () =>
	{
		if ( params.slug )
		{
			let id = extractIdBySlug( params.slug );
			getMenu( id );

		} else
		{
			dispatch( toggleShowLoading( true ) );
			getBlogs( { ...INIT_PAGING, status: 1 } )
		}
	}, [ params.slug ] );

	const getMenu = async ( id ) =>
	{
		dispatch( toggleShowLoading( true ) );
		const response = await MenuService.findById( id );
		if ( response )
		{
			setMenu( response );
			getBlogs( { ...INIT_PAGING, menu_id: response?.id, status: 1 } );
		} else
			dispatch( toggleShowLoading( false ) );
	}

	const getBlogs = async ( filters ) =>
	{
		const response = await BlogService.getList( filters );
		if ( response )
		{
			setBlogs( response?.blogs );
			setPaging( response?.meta )
		} else
		{
			setBlogs( [] );
			setPaging( INIT_PAGING )
		}
		dispatch( toggleShowLoading( false ) );
	}


	return (
		<Fragment>
			<MetaTags>
				<title>Tin tức</title>
				<meta
					name="description"
					content="Tin tức"
				/>
			</MetaTags>
			<BreadcrumbsItem to={ "/" }>Trang chủ</BreadcrumbsItem>
			<BreadcrumbsItem to={ menu ? "/menu" : pathname }>
				Blog
			</BreadcrumbsItem>

			<BreadcrumbsItem to={ pathname }>
				{ menu?.name || "Blog" }
			</BreadcrumbsItem>

			<LayoutOne headerTop="visible">
				{/* breadcrumb */ }
				<Breadcrumb />
				<div className="blog-area pt-100 pb-100">
					<div className="container">
						<div className="row flex-row-reverse">
							<div className="col-lg-9">
								<div className="ml-20">
									<div className="row">
										<BlogPosts data={ blogs } />
									</div>
									{/* <BlogPagination /> */ }
									{
										paging.total > 0 &&
										<div className="mx-auto d-flex justify-content-center my-4">
											<Pagination
												onChange={ e =>
													getBlogs( { page: e, page_size: INIT_PAGING.page_size, status: 1, menu_id: menu?.id || null } )
												}
												pageSize={ paging.page_size }
												defaultCurrent={ paging.page }
												total={ paging.total }
											/>
										</div>
									}
								</div>
							</div>
							<div className="col-lg-3">
								<BlogSidebar />
							</div>
						</div>
					</div>
				</div>
			</LayoutOne>
		</Fragment>
	);
};

BlogStandard.propTypes = {
	location: PropTypes.object
};

export default BlogStandard;
