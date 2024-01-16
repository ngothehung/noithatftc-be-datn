import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { getCategories } from "../../services";
import MenuService from "../../services/shop/MenuService";

const NavMenu = ( { strings, menuWhiteClass, sidebarMenu } ) =>
{
	const [ categories, setCategories ] = useState( [] );
	const [ menus, setMenus ] = useState( [] );
	useEffect( () =>
	{
		getCategories( { page: 1, page_size: 100, status: 1 }, setCategories );
		MenuService.getList({page: 1, page_size: 1000}, setMenus)
	}, [] );
	return (
		<div
			className={ ` ${ sidebarMenu
				? "sidebar-menu"
				: `main-menu ${ menuWhiteClass ? menuWhiteClass : "" }`
				} ` }
		>
			<nav>
				<ul>
					<li>
						<Link to="/home">
							{ ' Trang chủ' }
						</Link>
					</li>
					<li>
						<Link to="/shop">
							{ " Sản phẩm" }
							{ sidebarMenu ? (
								<span>
									<i className="fa fa-angle-right"></i>
								</span>
							) : (
								<i className="fa fa-angle-down" />
							) }
						</Link>
						<ul className="mega-menu mega-menu-padding row">
							<li className="col-12">
								<ul>
									{ categories?.length > 0 &&
										categories.map( ( item, key ) =>
										{
											return <li key={ key } className="text-break">
												<a className="text-break" href={ `/shop?category_id=${ item.id }` }>
													{ item?.name }
												</a>
											</li>
										} )
									}
								</ul>
							</li>
						</ul>

					</li>
					<li>
						<Link to="/menu">
							{ "Bài viết" }
							{ sidebarMenu ? (
								<span>
									<i className="fa fa-angle-right"></i>
								</span>
							) : (
								<i className="fa fa-angle-down" />
							) }
						</Link>
						<ul className="mega-menu mega-menu-padding row">
							<li className="col-12">
								<ul>
									{ menus?.length > 0 &&
										menus.map( ( item, key ) =>
										{
											return <li key={ key } className="text-break">
												<Link className="text-break" to={ `/menu/${item.slug}-${item.id}` }>
													{ item?.name }
												</Link>
											</li>
										} )
									}
								</ul>
							</li>
						</ul>

					</li>
					<li>
						<Link to="/lien-he">
							{ " Liên hệ" }
						</Link>
					</li>
					<li>
						<Link to="/gioi-thieu">
							{ " Giới thiệu" }
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

NavMenu.propTypes = {
	menuWhiteClass: PropTypes.string,
	sidebarMenu: PropTypes.bool,
	strings: PropTypes.object
};

export default multilanguage( NavMenu );
