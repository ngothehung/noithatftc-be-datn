import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { buildImage } from "../../services";

const HeroSliderTwentyTwoSingle = ({ data, sliderClass }) => {
    return (
        <div
            className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${
                sliderClass ? sliderClass : ""
            }`}
            style={{ backgroundImage: `url(${data.avatar})`, height: '300px' }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-7 col-md-8 col-12">
                        <div className="slider-content-2 slider-content-2--style2 slider-content-2--style2--white slider-animated-1">
                            <h3 className="animated no-style">{data.name}</h3>
                            <div className="slider-btn btn-hover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

HeroSliderTwentyTwoSingle.propTypes = {
    data: PropTypes.object,
    sliderClass: PropTypes.string
};

export default HeroSliderTwentyTwoSingle;
