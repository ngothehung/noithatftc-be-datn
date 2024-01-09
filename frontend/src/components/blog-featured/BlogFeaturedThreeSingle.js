import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { buildImage } from "../../services";
import { customDate } from "../../helpers/func";

const BlogFeaturedThreeSingle = ( { singlePost } ) =>
{
	console.log( '----------- singlePost: ', singlePost );
	return (
		<div className="col-lg-4 col-sm-6  mb-30">
			<div className="blog-wrap h-100 flex-column d-flex justify-content-between scroll-zoom" style={{background: "#f6f3f3"}}>
				<div className="blog-img">
					<Link to={ `/blog-details/${ singlePost?.slug }-${ singlePost?.id }` }>
						<img
							src={ buildImage( singlePost?.avatar ) }
							alt={ singlePost?.id }
						/>
					</Link>
					{/* <div className="blog-category-names blog-category-names--style2">
						{ singlePost?.category?.map( ( singleCategory, key ) =>
						{
							return (
								<span className="red" key={ key }>
									{ singleCategory }
								</span>
							);
						} ) }
					</div> */}
				</div>
				<div className="blog-content-wrap">
					<div className="blog-content blog-content--style2 text-left">
						<h3>
							<Link to={ `/blog-details/${ singlePost?.slug }-${ singlePost?.id }` }>
								{ singlePost?.title }
							</Link>
						</h3>
						<span>
							{ customDate( singlePost?.created_at, 'DD/MM/yyyy' ) } - 
							<Link to={ `/blog-details/${ singlePost?.slug }-${ singlePost?.id }` }>
								{ singlePost?.author_name }
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

BlogFeaturedThreeSingle.propTypes = {
	singlePost: PropTypes.object
};

export default BlogFeaturedThreeSingle;
