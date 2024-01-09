import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { buildImage } from "../../services";
import { customDate, customNumber } from "../../helpers/func";

const BlogPosts = ( props ) =>
{
	return (
		<>
			{ props.data?.length > 0 && props.data.map( ( item, key ) =>
			{
				return <div className="col-lg-6 col-md-6 col-sm-12 mb-30" key={key}>
					<div className="blog-wrap-2 h-100 d-flex flex-column justify-content-between">
						<div className="blog-img-2">
							<Link to={ `/blog-details/${item.slug}-${item.id}`  }>
								<img
									src={buildImage(item.avatar) }
									alt={item.id}
								/>
							</Link>
						</div>
						<div className="blog-content-2">
							<div className="blog-meta-2">
								<ul>
									<li>{customDate(item.created_at, 'DD/MM/yyyy')}</li>
									
								</ul>
							</div>
							<h4>
								<Link to={ `/blog-details/${item.slug}-${item.id}` }>
									{item.title}
								</Link>
							</h4>
							<p>
								{item.description}
							</p>
							<div className="blog-share-comment">
								<div className="blog-btn-2">
									<Link to={ `/blog-details/${item.slug}-${item.id}` }>
										Xem thêm
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			} ) }
		</>
    );
};

export default BlogPosts;
