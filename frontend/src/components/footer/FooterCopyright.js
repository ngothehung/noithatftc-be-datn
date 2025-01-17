import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
    return (
        <div
            className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${colorClass ? colorClass : ""
                }`}
        >
            <div className="footer-logo me-2">
                <Link to={process.env.PUBLIC_URL + "/"}>
                    <h2 className="font-weight-bold text-break">
						<img className={'w-100'} src="/assets/logo2.png" alt="logo"/>
						{/* Cửa hàng nội thất */}
                    </h2>
                </Link>
            </div>
            {/* <p>
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://hasthemes.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Flone
        </a>
        .<br /> All Rights Reserved
      </p> */}
        </div>
    );
};

FooterCopyright.propTypes = {
    footerLogo: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    colorClass: PropTypes.string
};

export default FooterCopyright;
