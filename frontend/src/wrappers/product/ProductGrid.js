import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import { getItem } from "../../services";
import { LoadingList } from "../../components/loading/LoadingList";

const ProductGrid = ( {
	products,
	currency,
	addToCart,
	addToWishlist,
	addToCompare,
	cartItems,
	wishlistItems,
	compareItems,
	sliderClassName,
	spaceBottomClass,
	loading
} ) =>
{

	const userId = getItem( 'id' );
	if ( loading == true || products?.length <= 0 || !products )
	{
		return <LoadingList
			total={ 4 }
			className={ `col-xl-3 col-md-6 col-lg-4 col-sm-6` }
			height={ 370 } />
	}
	return (

		products?.length > 0 && products.map( product =>
		{
			return (
				<ProductGridSingle
					sliderClassName={ sliderClassName }
					spaceBottomClass={ spaceBottomClass }
					product={ product }
					currency={ currency }
					addToCart={ addToCart }
					addToWishlist={ addToWishlist }
					addToCompare={ addToCompare }
					cartItems={cartItems}
					cartItem={
						cartItems.filter( cartItem => cartItem.id === product.id )[ 0 ]
					}
					wishlistItem={
						wishlistItems.filter(
							wishlistItem => wishlistItem.id === product.id && wishlistItem?.user_like === userId
						)[ 0 ]
					}
					compareItem={
						compareItems.filter(
							compareItem => compareItem.id === product.id
						)[ 0 ]
					}
					key={ product.id }
				/>
			);
		} )
	);
};

ProductGrid.propTypes = {
	addToCart: PropTypes.func,
	addToCompare: PropTypes.func,
	addToWishlist: PropTypes.func,
	cartItems: PropTypes.array,
	compareItems: PropTypes.array,
	currency: PropTypes.object,
	products: PropTypes.array,
	sliderClassName: PropTypes.string,
	spaceBottomClass: PropTypes.string,
	wishlistItems: PropTypes.array
};

const mapStateToProps = ( state, ownProps ) =>
{
	return {
		currency: state.currencyData,
		cartItems: state.cartData,
		wishlistItems: state.wishlistData,
		compareItems: state.compareData
	};
};

const mapDispatchToProps = dispatch =>
{
	return {
		addToCart: (
			item,
			addToast,
			quantityCount,
		) =>
		{
			dispatch(
				addToCart(
					item,
					addToast,
					quantityCount,
				)
			);
		},
		addToWishlist: ( item, addToast ) =>
		{
			dispatch( addToWishlist( item, addToast ) );
		},
		addToCompare: ( item, addToast ) =>
		{
			dispatch( addToCompare( item, addToast ) );
		}
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( ProductGrid );
