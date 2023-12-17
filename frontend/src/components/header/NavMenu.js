import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenu = ( { strings, menuWhiteClass, sidebarMenu } ) =>
{
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
							{ ' Trang chủ'}
						</Link>
					</li>
					<li>
						<Link to="/shop">
							{ " Sản phẩm" }
						</Link>
					</li>
					{/* <li>
						<Link to="/blog-standard">
							{ " Tin tức" }

						</Link>
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
					</li> */}
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
