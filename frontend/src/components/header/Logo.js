import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
    return (
        <div className={`${logoClass ? logoClass : ""}`}>
            <Link to={process.env.PUBLIC_URL + "/"}>
                <h2 className="font-weight-bold" style={{ marginTop:"20px"}}>
                     <img className={'w-60'} src="/assets/logo2.png" alt="logo"/>
                </h2>
            </Link>
        </div>
    );
};

Logo.propTypes = {
    imageUrl: PropTypes.string,
    logoClass: PropTypes.string
};

export default Logo;
