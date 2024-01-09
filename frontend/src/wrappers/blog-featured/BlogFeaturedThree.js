import PropTypes from "prop-types";
import React from "react";
import blogFeaturedThreeData from "../../data/blog-featured/blog-featured.json";
import BlogFeaturedThreeSingle from "../../components/blog-featured/BlogFeaturedThreeSingle";
import SectionTitle from "../../components/section-title/SectionTitle";
import { LoadingList } from "../../components/loading/LoadingList";

const BlogFeaturedThree = ( props ) =>
{
	return (
		<div
			className={ `blog-area ${ props.spaceTopClass ? props.spaceTopClass : "" } ${ props.spaceBottomClass ? props.spaceBottomClass : ""
				}` }
		>
			<div className="container">
				<SectionTitle
					titleText="Bài viết"
					subtitleText=""
					positionClass="text-center"
					spaceClass="mb-55"
					borderClass="no-border"
				/>

				<div className="row">
					{ props.loading == true && ( !props.blogs || props.blogs?.length <= 0 ) &&
						<LoadingList
							total={ 3 }
							className={ 'col-lg-4 col-sm-6' }
							height={ 370 } />
					}
					{ props.blogs?.length > 0 && props.blogs.map( singlePost =>
					{
						return (
							<BlogFeaturedThreeSingle
								singlePost={ singlePost }
								key={ singlePost.id }
							/>
						);
					} ) }
				</div>
			</div>
		</div>
	);
};

BlogFeaturedThree.propTypes = {
	spaceBottomClass: PropTypes.string,
	spaceTopClass: PropTypes.string
};

export default BlogFeaturedThree;
