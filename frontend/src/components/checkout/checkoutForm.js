import { Tab } from "react-bootstrap";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { ORDER_SERVICE, getItem, onFieldsChange, validateMessages } from "../../services";
import { Form, Input, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { Auth_Service } from "../../services/shop/auth-service";
import { toggleShowLoading } from "../../redux/actions/common";
import TextArea from "antd/es/input/TextArea";
import { REGEX_EMAIL, REGEX_PHONE, timeDelay } from "../../helpers/constant";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import axios from 'axios'

export const CheckoutForm = ( props ) =>
{
	const [ form ] = useForm();

	const { addToast } = useToasts();

	const dispatch = useDispatch();


	useEffect( () =>
	{
		let obj = {
			receiver_name: getItem( 'name' ),
			receiver_email: getItem( 'email' ),
			receiver_phone: getItem( 'phone' )
		}
		form.setFieldsValue(obj);
	}, [] )

	useEffect( () =>
	{
		if ( props.submit )
		{
			form.submit();
			props.setSubmit( false )
		}
	}, [ props.submit ] )

	const submitForm = async ( e ) =>
	{

		let cartTotalPrice = 0;
		let totalDiscount = 0;
		if ( props.cartItem?.length > 0 )
		{
			let products = props.cartItem.reduce( ( newProd, item ) =>
			{
				const discountedPrice = Number( getDiscountPrice(
					item?.price,
					item?.sale
				) );

				const sale = item?.price - discountedPrice;
				
				const finalProductPrice = Number( (
					item?.price
				).toFixed( 2 ) );
				const finalDiscountedPrice = Number( (
					discountedPrice * (props.currency?.currencyRate || 1)
				).toFixed( 2 ) );

				discountedPrice != null && discountedPrice != 0
					? ( cartTotalPrice +=
						finalDiscountedPrice * item?.quantity )
					: ( cartTotalPrice +=
						finalProductPrice * item?.quantity );
				totalDiscount += (sale || 0);
				newProd.push( {
					quantity: item.quantity,
					id: item.id
				} );
				return newProd
			}, [] );
			try
			{
				dispatch( toggleShowLoading( true ) );
				let data = {
					...e,
					products: products,
					total_price: cartTotalPrice,
					user_id: getItem("id"),
					total_discount: totalDiscount,
					status: 1,
					payment_status: 0,
					shipping_status: 1,
					order_type: 0,
					payment_type: props.paymentType
				 }
				const response = await ORDER_SERVICE.create( data );
				await timeDelay( 1000 );
				if ( response?.status === 'success' )
				{
					console.log('============ response: ', response);

					

					message.success( 'Checkout successfully!' );
					await timeDelay( 1000 );
					window.location.href = '/';
					dispatch( deleteAllFromCart( addToast ) );
				} else
				{
					message.error( response?.message || 'error' );
				}
				dispatch( toggleShowLoading( false ) );
			} catch ( error )
			{
				message.error( error?.message || 'error' );
				dispatch( toggleShowLoading( false ) );
			}

		}

		dispatch( toggleShowLoading( false ) );
	}

	console.log( props );

	return (
		<Form
			className='p-3'
			name='form'
			form={ form }
			onFinish={ submitForm }
			onFieldsChange={ ( e ) => onFieldsChange( e, form ) }
			validateMessages={ validateMessages }
		>
			<Form.Item name="receiver_name" label="Họ và tên"
				rules={ [ { required: true, } ] }
				className=' d-block'>
				<Input className=' mb-0' placeholder='Enter full name' />
			</Form.Item>

			<Form.Item name="receiver_email" label="Email"
				rules={ [ { required: true, type: 'email' } ] }
				className=' d-block'>
				<Input type="email" className=' mb-0' placeholder='Enter email' />
			</Form.Item>

			<Form.Item name="receiver_phone" label="Số điện thoại"
				rules={ [ { required: true, pattern: REGEX_PHONE } ] }
				className=' d-block'>
				<Input className=' mb-0' placeholder='Enter phone' />
			</Form.Item>

			<Form.Item name="receiver_address" label="Địa chỉ"
				rules={ [ { required: true } ] }
				className=' d-block'>
				<Input className=' mb-0' placeholder='Enter address' />
			</Form.Item>

			<Form.Item name="note" label="ghi chú"
				className=' d-block'>
				<TextArea rows={ 5 } className=' mb-0' placeholder='Enter note' />
			</Form.Item>
		</Form>
	);
}
