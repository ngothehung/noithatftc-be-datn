// @ts-nocheck
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";
import { checkTimeNow, customNumber } from "../../helpers/func";
import { StarIcons } from "../common/star";
import { getItem } from "../../services";
import { ProductOptions } from "../../wrappers/product/ProductOptions";
import { LoadingList } from "../loading/LoadingList";

const ProductDescriptionInfo = ({
	product,
	discountedPrice,
	currency,
	finalDiscountedPrice,
	finalProductPrice,
	cartItems,
	wishlistItem,
	compareItem,
	addToast,
	addToCart,
	loading,
	addToWishlist,
	addToCompare
}) => {
	const [selectedProductColor, setSelectedProductColor] = useState(
		product?.variation ? product.variation[0].color : ""
	);
	const [selectedProductSize, setSelectedProductSize] = useState(
		product?.variation ? product.variation[0].size[0].name : ""
	);
	const [quantityCount, setQuantityCount] = useState(1);

	const productCartQty = getProductCartQuantity(
		cartItems,
		product,
		selectedProductColor,
		selectedProductSize
	);

	let vote_number = 0;
	if (product?.total_stars && product?.total_reviews) {
		vote_number = Number(Math.round(product?.total_stars / product?.total_reviews));
	}
	const checkTime = (checkTimeNow(product?.sale_to) && product?.sale);
	const userId = getItem('id');
	return (

		<div className="product-details-content ml-70">
			{loading == true &&
				<LoadingList
					total={1}
					className={``}
					height={50} />
			}
			{
				loading === false && product &&
				<>
					<h2>{product.name}</h2>
					{product.category ? (
						<div className="pro-details-meta mt-4 d-flex align-items-center">
							<h4 className="mb-0 mr-2">Danh mục :</h4>
							<h4 className="mb-0">
								<Link to={process.env.PUBLIC_URL + "/shop" + '?category_id=' + product?.category?.id}>
									{product?.category?.name}
								</Link>
							</h4>
						</div>
					) : (
						""
					)}
				</>
			}
			{loading == true &&
				<LoadingList
					total={1}
					className={``}
					height={50} />
			}
			{
				loading === false && product &&
				<>
					<div className="product-details-price">
						{product.sale && checkTime ? (
							<Fragment>
								<span>{customNumber(finalDiscountedPrice, 'đ')}</span>{" "}
								<span className="old">
									{customNumber(finalProductPrice, 'đ')}
								</span>
							</Fragment>
						) : (
							<span className="not-sale">{customNumber(finalProductPrice, 'đ')} </span>
						)}
					</div>
					<div className="pro-details-rating-wrap">
						<div className="pro-details-rating">
							<StarIcons vote_number={vote_number} />
						</div>
					</div>

				</>
			}
			{loading == true &&
				<LoadingList
					total={1}
					className={``}
					height={50} />
			}
			{loading === false && product &&
				<div className="pro-details-list">
					<p>{product?.description}</p>
				</div>
			}
			{loading == true &&
				<LoadingList
					total={1}
					className={``}
					height={50} />
			}
			{loading === false && product &&
				<>
					<div className="pro-details-quality">
						<div className="cart-plus-minus">
							<button
								onClick={() =>
									setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
								}
								className="dec qtybutton"
							>
								-
							</button>
							<input
								className="cart-plus-minus-box"
								type="text"
								value={quantityCount}
								readOnly
							/>
							<button
								onClick={() => {
									setQuantityCount((prevCount) => {
										const newCount = Math.min(prevCount + 1, 5, product.number - productCartQty);

										if (newCount === 5) {
											addToast("Bạn chỉ có thể thêm tối đa 5 sản phẩm", { appearance: 'warning', autoDismiss: true });
										}

										return newCount;
									});
								}}
								className="inc qtybutton"
							>
								+
							</button>
						</div>
						<div className="pro-details-cart btn-hover">
							{product.number && product.number > 0 ? (
								<button
									onClick={() =>
										addToCart(
											product,
											addToast,
											quantityCount,
											selectedProductColor,
											selectedProductSize
										)
									}
									disabled={(productCartQty >= product.number || productCartQty >= 5)}
								>
									{" "}
									Thêm giỏ hàng{" "}
								</button>
							) : (
								<button disabled>Out of stock</button>
							)}
						</div>
						{
							userId != null &&
							<div className="pro-details-wishlist btn-hover">
								<button
									className={wishlistItem !== undefined ? "active" : ""}
									disabled={wishlistItem !== undefined}
									title={
										wishlistItem !== undefined
											? "Yêu thích"
											: "Yêu thích"
									}
									onClick={() => addToWishlist({ ...product, user_like: userId }, addToast)}
								>
									<i className="pe-7s-like" />
								</button>
							</div>
						}

					</div>
				</>
			}
			{loading == true &&
				<LoadingList
					total={1}
					className={``}
					height={50} />
			}
			{loading === false && product &&
				<>
					{
						product?.options?.length > 0 &&
						<div className=" my-3">
							<h4>Thông tin sản phẩm</h4>
							<div className="product-parameter">
								<ProductOptions options={product?.options} />
							</div>
						</div>
					}
				</>
			}

			{/* )} */}

			{/* {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )} */}

			{/* <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div> */}
		</div>
	);
};

ProductDescriptionInfo.propTypes = {
	addToCart: PropTypes.func,
	//   addToCompare: PropTypes.func,
	addToWishlist: PropTypes.func,
	addToast: PropTypes.func,
	cartItems: PropTypes.array,
	compareItem: PropTypes.array,
	currency: PropTypes.object,
	discountedPrice: PropTypes.number,
	finalDiscountedPrice: PropTypes.number,
	finalProductPrice: PropTypes.number,
	product: PropTypes.object,
	wishlistItem: PropTypes.object
};

const mapDispatchToProps = dispatch => {
	return {
		addToCart: (
			item,
			addToast,
			quantityCount,
			selectedProductColor,
			selectedProductSize
		) => {
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
		addToWishlist: (item, addToast) => {
			dispatch(addToWishlist(item, addToast));
		},
		// addToCompare: (item, addToast) => {
		//   dispatch(addToCompare(item, addToast));
		// }
	};
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
