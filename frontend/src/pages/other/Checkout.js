import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { checkTimeNow, customNumber } from "../../helpers/func";
import { CheckoutForm } from "../../components/checkout/checkoutForm";
import { SUCCESS_PAYMENT } from "../../helpers/constant";
import { Input } from "antd";
import { DiscountService } from "../../services/shop/discount-service";

const Checkout = ({ location, cartItems, currency }) => {
	const { pathname } = location;
	let cartTotalPrice = 0;

	const [submit, setSubmit] = useState(false);
	const [discount, setDiscount] = useState(0);
	const [paymentType, setPaymentType] = useState(1);
	const [form, setForm] = useState({});

	const findDiscountByCode = async (code) => {
		try {
			const response = await DiscountService.findByCode(code?.trim());
			if (response?.status === 'success') {
				setDiscount(response?.data?.price || 0);
			}
		} catch (error) {
			console.error('error======> ', error);
			setDiscount(0);

		}
	}
	const [showImage, setShowImage] = useState(false);

	const handleButtonClick = () => {
		setSubmit(false);
		setPaymentType(1);
		setShowImage(true);
	};
	const handleBankTransferButtonClick = async () => {
		setSubmit(false); // Đặt giá trị false để ngăn chặn việc gửi biểu mẫu
		setPaymentType(1);
		setShowImage(true);
	
		// Thêm bất kỳ logic bất đồng bộ nào nếu cần
		// Ví dụ, bạn có thể muốn thực hiện một số cuộc gọi API ở đây
	  };
	
	
	


	return (
		<Fragment>
			<MetaTags>
				<title>[Cửa hàng nội thất] Checkout</title>
				<meta
					name="description"
					content="Checkout page of shop react minimalist eCommerce template."
				/>
			</MetaTags>
			<BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
			<BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
				Checkout
			</BreadcrumbsItem>
			<LayoutOne headerTop="visible">
				{/* breadcrumb */}
				<Breadcrumb />
				<div className="checkout-area pt-95 pb-100">
					<div className="container">
						{cartItems && cartItems.length >= 1 ? (
							<div className="row">
								<div className="col-lg-7">
									<div className="billing-info-wrap">
										<h3>Chi tiết đơn hàng</h3>
										<CheckoutForm
											paymentType={paymentType}
											submit={submit}
											setSubmit={setSubmit}
											cartItem={cartItems}
											discount={discount}
											setDiscount={setDiscount}
										/>
									</div>
								</div>

								<div className="col-lg-5">
									<div className="your-order-area">
										<h3>Đơn hàng</h3>
										<div className="your-order-wrap gray-bg-4">
											<div className="your-order-product-info">
												<div className="your-order-top">
													<ul>
														<li>Sản phẩm</li>
														<li>Giá</li>
													</ul>
												</div>
												<div className="your-order-middle">
													<ul>
														{cartItems.map((cartItem, key) => {
															const discountedPrice = (checkTimeNow(cartItem?.sale_to) && cartItem.sale) ? Number(getDiscountPrice(
																cartItem.price,
																cartItem.sale
															)) : null;
															const finalProductPrice = Number((
																cartItem.price
															).toFixed(2));
															const finalDiscountedPrice = Number((
																discountedPrice * currency.currencyRate
															).toFixed(2));

															discountedPrice != null && discountedPrice != 0
																? (cartTotalPrice +=
																	finalDiscountedPrice * cartItem.quantity)
																: (cartTotalPrice +=
																	finalProductPrice * cartItem.quantity);

															if (discount > cartTotalPrice) {
																cartTotalPrice = 0;
															} else {
																cartTotalPrice -= discount;
															}
															return (
																<li key={key}>
																	<span className="order-middle-left">
																		{cartItem.name} X {cartItem.quantity}
																	</span>{" "}
																	<span className="order-price">
																		{discountedPrice !== null && discountedPrice != 0
																			? customNumber((finalDiscountedPrice * cartItem.quantity).toFixed(2), '₫')
																			: customNumber((finalProductPrice * cartItem.quantity).toFixed(2), '₫')}
																	</span>
																</li>
															);
														})}
													</ul>
												</div>
												<div className="your-order-bottom">
													<ul>
														<li className="your-order-shipping">Mã giảm giá</li>
														<li>
															<Input type="text" className=' mb-0'
																placeholder='Nhập mã giảm giá'
																onChange={e => {
																	if (e?.target?.value) {
																		findDiscountByCode(e?.target?.value)
																	}
																}}
															/>
														</li>
													</ul>
													<ul>
														<li className="your-order-shipping">Giảm giá</li>
														<li>
															{customNumber(discount.toFixed(2), '₫')}
														</li>
													</ul>
												</div>
												<div className="your-order-total">
													<ul>
														<li className="order-total">Giá trị đơn hàng</li>
														<li>
															{customNumber(cartTotalPrice.toFixed(2), '₫')}
														</li>
													</ul>
												</div>
											</div>
											<div className="payment-method"></div>
										</div>
										<div className="place-order mt-25">
											<button className="btn-hover" onClick={e => {
												setSubmit(true);
												setPaymentType(2);
											}}>
												Tiền mặt
											</button>
										</div>
										<div>
											{showImage && (
												<div className="place-order mt-25">
													<img
														src={`https://img.vietqr.io/image/vietinbank-113366668888-compact2.jpg?amount=${cartTotalPrice}&addInfo=Thanhtoánđơnhàng`}
														alt="Payment QR Code"
													/>
												</div>
											)}

											<div className="place-order mt-25">
												{showImage ? (
													<button className="btn-hover" 
													onClick={e => {
														setSubmit(true);
														setPaymentType(1);
													}}
													>
														Thanh toán thành công
													</button>
												) : (
													<button className="btn-hover" onClick={handleBankTransferButtonClick}>
														Chuyển khoản ngân hàng
													</button>
												)}
											</div>
										</div>

										{/* <div className="place-order mt-25">

											<button className="btn-hover" onClick={e => {
												setSubmit(true);
												setPaymentType(1);
											}}>
												Đã chuyển khoản
											</button>
										</div>
										<div className="place-order mt-25">
											<img src={`https://img.vietqr.io/image/vietcombank-1022193647-compact2.jpg?amount=${cartTotalPrice}&addInfo=Thanhtoánđơnhàng`} />
										</div> */}
									</div>
								</div>
							</div>
						) : (
							<div className="row">
								<div className="col-lg-12">
									<div className="item-empty-area text-center">
										<div className="item-empty-area__icon mb-30">
											<img src={SUCCESS_PAYMENT} width={80} height={80} alt='payment' className="d-block mx-auto" />
										</div>
										<div className="item-empty-area__text">
											Đơn hàng đặt thành công <br />{" "}
											<Link to={process.env.PUBLIC_URL + "/shop"}>
												Cửa hàng
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</LayoutOne>
		</Fragment>
	);
};

Checkout.propTypes = {
	cartItems: PropTypes.array,
	currency: PropTypes.object,
	location: PropTypes.object
};

const mapStateToProps = state => {
	return {
		cartItems: state.cartData,
		currency: state.currencyData
	};
};

export default connect(mapStateToProps)(Checkout);
