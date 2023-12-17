import PropTypes from "prop-types";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BANNER_1, BANNER_2, BANNER_3, BANNER_4 } from "../../helpers/constant";

const BannerPage = () =>
{
	return (
		<Container>
			<div className="row pt-100 product-area">
				<div className="col-12 col-md-3 my-3">
					<div className="icon-banner text-center bg-1 d-flex 
					justify-content-center align-items-center">
						<img src={ BANNER_1 } width={ 40 } height={ 40 } />
					</div>
					<div className="banner-content text-center">
						<h4>Free ship</h4>
						<p>On order Over $100</p>
					</div>
				</div>
				<div className="col-12 col-md-3 my-3">
					<div className="icon-banner text-center  bg-2 d-flex 
					justify-content-center align-items-center">
						<img src={ BANNER_2 } width={ 40 } height={ 40 } />
					</div>
					<div className="banner-content text-center">
						<h4>Always Fresh</h4>
						<p>On order Over $100</p>
					</div>
				</div>
				<div className="col-12 col-md-3 my-3">
					<div className="icon-banner text-center bg-3 d-flex 
					justify-content-center align-items-center">
						<img src={ BANNER_3 } width={ 40 } height={ 40 } />
					</div>
					<div className="banner-content text-center">
						<h4>Superior Quality</h4>
						<p>On order Over $100</p>
					</div>
				</div>
				<div className="col-12 col-md-3 my-3">
					<div className="icon-banner text-center bg-4 d-flex 
					justify-content-center align-items-center">
						<img src={ BANNER_4 } width={ 40 } height={ 40 } />
					</div>
					<div className="banner-content text-center">
						<h4>Support</h4>
						<p>On order Over $100</p>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default BannerPage;
