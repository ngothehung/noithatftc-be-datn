import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import BannerOne from "../../wrappers/banner/BannerOne";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

const About = ({ location }) => {
    const { pathname } = location;

    return (
        <Fragment>
            <MetaTags>
                <title>Giới thiệu</title>
                <meta
                    name="description"
                    content="About page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Giới thiệu
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />
                <div
                    className={`welcome-area  mt-5 mb-5`}
                >
                    <div className="container">
                        <div className="welcome-content text-center">
                            <h5>Giới thiệu</h5>
                            <h1>Đây là trang giới thiệu của chúng tôi</h1>
                        </div>
                    </div>
                    <div className={'container'}>
                        <img src={`/assets/ab1.webp`} alt="" className={'w-100'} />
                        <img src={`/assets/ab2.webp`} alt="" className={'w-100'} />
                        <img src={`/assets/ab3.webp`} alt="" className={'w-100'} />
                        <img src={`/assets/ab4.webp`} alt="" className={'w-100'} />
                        <img src={`/assets/ab5.webp`} alt="" className={'w-100'} />
                        <img src={`/assets/ab6.webp`} alt="" className={'w-100'} />
                    </div>
                </div>

                {/* brand logo slider */}
                <BrandLogoSliderOne spaceBottomClass="pb-70" />
            </LayoutOne>
        </Fragment>
    );
};

About.propTypes = {
    location: PropTypes.object
};

export default About;
