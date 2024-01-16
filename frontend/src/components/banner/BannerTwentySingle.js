import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import {  onErrorImage } from "../../services";

const BannerTwentySingle = ({ data, spaceBottomClass }) => {
    return (
        <div className="col-lg-4 col-md-4">
            <div
                className={`single-banner-2 ${spaceBottomClass ? spaceBottomClass : ""
                    } ${data.textAlign === "right" ? "align_right" : ""}`}
            >
                <Link to={{ pathname: '/shop', search: `?category_id=${data.id}` }} qu>
                    <img style={{ objectFit: "cover", maxHeight: "450px" }}
                        src={data.avatar} alt={data.name} onError={onErrorImage} />
                </Link>
            </div>
        </div>
    );
};

BannerTwentySingle.propTypes = {
    data: PropTypes.object,
    spaceBottomClass: PropTypes.string
};

export default BannerTwentySingle;
