import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import { getItem } from "../../services";

export const ProductOptions = ( props ) =>
{

	return (
		<ul className="d-block">
			{ props.options && props.options.map( ( option, key ) =>
			{
				return (
					<li key={ key } className='d-flex'>
						<p className="li-left">{ option.key }</p>
						<p className="li-right">{ option.value }</p>
					</li>
				);
			} )
			}
		</ul>

	);
};
