import PropTypes from "prop-types";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BANNER_1, BANNER_2, BANNER_3, BANNER_4 } from "../../helpers/constant";
import BannerTwentySingle from "./BannerTwentySingle";
import { buildImage, onErrorImage } from "../../services";
import { LoadingList } from "../loading/LoadingList";

const BannerPage = ( { categories, loading } ) =>
{
	// {categories &&
	// categories.map((single, key) => {
	// 	return <BannerTwentySingle data={single} key={key} />;
	// })}

	return (
		<Container>
			<div className="row pt-100 product-area">
				{ loading == true && 
					<LoadingList 
					total={6} 
					className={'col-12 col-md-2 my-3'} 
					height={60}/>
				}
				{ loading === false && categories && categories.map( ( item, key ) =>
				{
					return (
						<div className="col-12 col-md-2 my-3" key={ key }>
							<Link to={ { pathname: '/shop', search: `?category_id=${ item.id }` } } qu>
								<div className="icon-banner text-center d-flex
						justify-content-center align-items-center">
									<img src={ buildImage( item.avatar ) } width={ 40 } height={ 40 } onError={ onErrorImage } />
								</div>
								<div className="banner-content text-center">
									<h4>
										<Link to={ { pathname: '/shop', search: `?category_id=${ item.id }` } } qu>
											{ item.name }
										</Link>
									</h4>
								</div>
							</Link>
						</div>
					)
				} ) }
			</div>
		</Container>
	);
};

export default BannerPage;
