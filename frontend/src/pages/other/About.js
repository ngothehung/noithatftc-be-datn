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
                            <div>

                                Nội thất FTC  là đơn vị chuyên cung cấp và sản xuất nội thất chất lượng cao, mang đến không gian sống đẳng cấp và hiện đại cho khách hàng. Với nền tảng ưu việt trong việc kết hợp sự sang trọng, thiết kế độc đáo và chất liệu chọn lọc, chúng tôi cam kết mang lại trải nghiệm tối ưu nhất cho ngôi nhà của bạn.

                                Đội ngũ thiết kế chuyên nghiệp của chúng tôi liên tục sáng tạo và đổi mới, đảm bảo rằng mỗi sản phẩm của FTC không chỉ là sự kết hợp hoàn hảo giữa thẩm mỹ và tính ứng dụng, mà còn phản ánh đẳng cấp và cái đẹp riêng biệt của chủ nhân.

                                FTC  tự hào với việc sử dụng các vật liệu và công nghệ tiên tiến nhất để tạo ra những sản phẩm bền bỉ và chất lượng, đồng thời luôn tập trung vào việc cải tiến quy trình sản xuất để đáp ứng nhu cầu đa dạng của khách hàng.

                                Chúng tôi không chỉ cung cấp nội thất mà còn mang đến giải pháp thiết kế toàn diện, từ ý tưởng ban đầu đến thực tế, giúp khách hàng biến ước mơ về không gian sống lý tưởng thành hiện thực. Hãy để FTC Furniture là đối tác đồng hành của bạn trong việc tạo nên không gian sống đẳng cấp và độc đáo.

                                </div>
                            </div>
                        </div>
                        <div className={'container'}>

                        </div>
                    </div>

                    {/* brand logo slider */}
                   
            </LayoutOne>
        </Fragment>
    );
};

About.propTypes = {
    location: PropTypes.object
};

export default About;
