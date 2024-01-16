export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//Thêm giỏ hàng
export const addToCart = (
	item,
	addToast,
	quantityCount,
) =>
{
	return dispatch =>
	{
		
		if ( item.quantity + quantityCount > item.number )
		{
			if ( addToast )
			{
				addToast( "quá số lượng trong kho", { appearance: "error", autoDismiss: true } );
			}
		} else
		{
			if ( addToast )
			{
				addToast( "Thêm giỏ hàng thành công", { appearance: "success", autoDismiss: true } );
			}
			dispatch( {
				type: ADD_TO_CART,
				payload: {
					...item,
					quantity: quantityCount
				}
			} );
		}

	};
};
//decrease from cart
export const decreaseQuantity = ( item, addToast ) =>
{
	return dispatch =>
	{
		if ( addToast )
		{
			addToast( "Giảm số lượng thành công", {
				appearance: "warning",
				autoDismiss: true
			} );
		}
		dispatch( { type: DECREASE_QUANTITY, payload: item } );
	};
};
//delete from cart
export const deleteFromCart = ( item, addToast ) =>
{
	return dispatch =>
	{
		if ( addToast )
		{
			addToast( "Xóa sản phẩm thành công", { appearance: "error", autoDismiss: true } );
		}
		dispatch( { type: DELETE_FROM_CART, payload: item } );
	};
};
//delete all from cart
export const deleteAllFromCart = ( addToast, type = "error", message = "Xóa giỏ hàng thành công" ) =>
{
	return dispatch =>
	{
		if ( addToast )
		{
			addToast( message, {
				appearance: type,
				autoDismiss: true
			} );
		}
		dispatch( { type: DELETE_ALL_FROM_CART } );
	};
};

// get stock of cart item
export const cartItemStock = ( item, color, size ) =>
{
	return item.number;
};
