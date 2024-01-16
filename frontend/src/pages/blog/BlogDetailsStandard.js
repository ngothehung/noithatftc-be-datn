import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPost from "../../wrappers/blog/BlogPost";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { toggleShowLoading } from "../../redux/actions/common";
import BlogService from "../../services/shop/BlogService";
import { extractIdBySlug } from "../../helpers/func";

const BlogDetailsStandard = ({ location }) => {
    const { pathname } = location;

	const params = useParams();
	const dispatch = useDispatch();
	const [ data, setData ] = useState( null );


	useEffect( () =>
	{
		if ( params.slug )
		{
			let id = extractIdBySlug( params.slug );
			getData( id );
			
		}
	}, [ params.slug ] );

	const getData = async ( id ) =>
	{
		dispatch(toggleShowLoading(true));
		const response = await BlogService.findById( id );
		console.log(response);
		if(response) {
			setData( response );
		} 
		dispatch(toggleShowLoading(false));
	}

    return (
        <Fragment>
            <MetaTags>
                <title>Cửa hàng Nội thất</title>
                <meta
                    name="description"
                    content="Blog post page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={"/menu"}>
                Blog
            </BreadcrumbsItem>
			<BreadcrumbsItem to={pathname}>
                Chi tiết
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div className="blog-area pt-100 pb-100">
                    <div className="container">
                        <div className="row flex-row-reverse">
                            <div className="col-lg-9">
                                <div className="blog-details-wrapper ml-20">
                                    <BlogPost data={data} />
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

BlogDetailsStandard.propTypes = {
    location: PropTypes.object
};

export default BlogDetailsStandard;
