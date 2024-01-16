import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import { getItem } from "../../services";
import { LoadingList } from "../../components/loading/LoadingList";

const ProductGridTwo = ( {
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
	colorClass,
	loading,
	titlePriceClass
} ) =>
{
	const userId = getItem( 'id' )
	return (
		<Fragment>
			{ loading == true && (!products || products?.length <= 0) &&
				<LoadingList
					total={ 4 }
					className={ 'col-xl-3 col-md-6 col-lg-4 col-sm-6' }
					height={ 370 } />
			}
			{ loading === false &&  products?.length > 0 && products.map( ( product ) =>
			{
				return (
					<ProductGridSingleTwo
						sliderClassName={ sliderClassName }
						spaceBottomClass={ spaceBottomClass }
						colorClass={ colorClass }
						product={ product }
						currency={ currency }
						addToCart={ addToCart }
						cartItems={cartItems}
						loading={ loading }
						addToWishlist={ addToWishlist }
						addToCompare={ addToCompare }
						cartItem={
							cartItems.filter( ( cartItem ) => cartItem.id === product.id )[ 0 ]
						}
						wishlistItem={
							wishlistItems.filter(
								( wishlistItem ) => wishlistItem.id === product.id && wishlistItem.user_like === userId
							)[ 0 ]
						}
						compareItem={
							compareItems.filter(
								( compareItem ) => compareItem.id === product.id
							)[ 0 ]
						}
						key={ product.id }
						titlePriceClass={ titlePriceClass }
					/>
				);
			} ) }

		</Fragment>
	);
};

ProductGridTwo.propTypes = {
	addToCart: PropTypes.func,
	addToCompare: PropTypes.func,
	addToWishlist: PropTypes.func,
	cartItems: PropTypes.array,
	compareItems: PropTypes.array,
	currency: PropTypes.object,
	products: PropTypes.array,
	sliderClassName: PropTypes.string,
	spaceBottomClass: PropTypes.string,
	colorClass: PropTypes.string,
	titlePriceClass: PropTypes.string,
	wishlistItems: PropTypes.array
};

const mapStateToProps = ( state, ownProps ) =>
{
	return {
		products: ownProps.products,
		currency: state.currencyData,
		cartItems: state.cartData,
		wishlistItems: state.wishlistData,
		compareItems: state.compareData
	};
};

const mapDispatchToProps = ( dispatch ) =>
{
	return {
		addToCart: (
			item,
			addToast,
			quantityCount,
			selectedProductColor,
			selectedProductSize
		) =>
		{
			
			dispatch(
				addToCart(
					item,
					addToast,
					quantityCount,
					selectedProductColor,
					selectedProductSize
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

export default connect( mapStateToProps, mapDispatchToProps )( ProductGridTwo );
