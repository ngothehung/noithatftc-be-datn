import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { customDate } from "../../helpers/func";

const BlogPost = ( props ) =>
{
	return (
		<>
			{ props.data &&
				<div className="blog-details-top">
					<div className="blog-details-img">
						<img
							alt={ props.data.title }
							src={  props.data.avatar  }
						/>
					</div>
					<div className="blog-details-content w-100">
						<div className="blog-meta-2">
							<ul>
								<li>{ customDate( props.data.created_at, 'DD/MM/yyyy' ) }</li>
							</ul>
						</div>
						<h3>{ props.data.title }</h3>
						<p>
							{ props.data.description }
						</p>
						<p dangerouslySetInnerHTML={ { __html: props.data?.content } }></p>
					</div>
				</div>
			}
		</>
	);
};

export default BlogPost;
