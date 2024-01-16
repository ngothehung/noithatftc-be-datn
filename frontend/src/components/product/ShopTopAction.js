import PropTypes from "prop-types";
import React from "react";
import { setActiveLayout } from "../../helpers/product";
import { Select } from "antd";

const ORDER_BY = [
	{ value: null, label: 'Sắp xếp theo' },
	{ value: 1, label: 'Giá cao đến thấp', order_by: "price", order_value: "DESC" },
	{ value: 2, label: 'Giá thấp đến cao', order_by: "price", order_value: "ASC" },
	{ value: 3, label: 'Mới nhất', order_by: "created_at", order_value: "DESC" }
]
const ShopTopAction = ( props ) =>
{
	return (
		<div className="shop-top-bar mb-35">
			<div className="select-shoing-wrap">
				<div className="shop-select">
					<Select
						options={ ORDER_BY }

						style={ { width: '200px' } }
						placeholder="Sắp xếp theo"
						onChange={ e =>
						{
							let params = { ...props.params };
							let item = ORDER_BY.find( v => v.value === e );
							if ( item?.value )
							{
								params.order_by = item?.order_by;
								params.order_value = item?.order_value;
								props.setParams( params )
							}

						} }
					>
					</Select>
				</div>
				<p>
					Showing { props.sortedProductCount } of { props.productCount } result
				</p>
			</div>

			<div className="shop-tab">
				<button
					onClick={ e =>
					{
						props.getLayout( "grid two-column" );
						setActiveLayout( e );
					} }
				>
					<i className="fa fa-th-large" />
				</button>
				<button
					onClick={ e =>
					{
						props.getLayout( "grid three-column" );
						setActiveLayout( e );
					} }
				>
					<i className="fa fa-th" />
				</button>
				<button
					onClick={ e =>
					{
						props.getLayout( "list" );
						setActiveLayout( e );
					} }
				>
					<i className="fa fa-list-ul" />
				</button>
			</div>
		</div>
	);
};

// ShopTopAction.propTypes = {
//   getLayout: PropTypes.func,
//   params: PropTypes.object,

//   productCount: PropTypes.number,
//   sortedProductCount: PropTypes.number
// };

export default ShopTopAction;
