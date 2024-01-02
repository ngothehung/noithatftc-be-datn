import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buildImage } from "../../services";
import { customDate } from "../../helpers/func";
import MenuService from "../../services/shop/MenuService";

const BlogSidebar = ( props ) =>
{
	const [ menus, setMenus ] = useState( [] );

	useEffect( () =>
	{
		MenuService.getList( { page: 1, page_size: 1000 }, setMenus )
	}, [] )
	return (
		<div className="sidebar-style">
			<div className="sidebar-widget">
				<h4 className="pro-sidebar-title">Danh mục blog</h4>
				<div className="sidebar-project-wrap mt-30">
					{ menus?.length > 0 && menus.map( ( item, key ) =>
					{
						return <div className="single-sidebar-blog" key={ key }>
							<div className="sidebar-blog-content">
								<h4>
									<Link to={ `/menu/${ item.slug }-${ item.id }` }>
										{ item.name }
									</Link>
								</h4>
							</div>
						</div>
					} ) }

				</div>
			</div>
		</div>
	);
};

export default BlogSidebar;
