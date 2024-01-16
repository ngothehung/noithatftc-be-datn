import React from "react";
import Swiper from "react-id-swiper";
import sliderData from "../../data/hero-sliders/hero-slider-twenty-two.json";
import HeroSliderTwentyTwoSingle from "../../components/hero-slider/HeroSliderTwentyTwoSingle.js";
import {Container} from "react-bootstrap";

const HeroSliderTwentyTwo = (props) => {
    const params = {
        effect: "fade",
        loop: true,
        speed: 1000,
        height: 100,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        renderPrevButton: () => (
            <button className="swiper-button-prev ht-swiper-button-nav">
                <i className="pe-7s-angle-left" />
            </button>
        ),
        renderNextButton: () => (
            <button className="swiper-button-next ht-swiper-button-nav">
                <i className="pe-7s-angle-right" />
            </button>
        )
    };
    return (
        <Container>
            <div className="row">
                <div className="col-12">
                    <div className="slider-area">
                        <div className="slider-active nav-style-1" style={{ height: "300px"}}>
                            <Swiper {...params}>
                                {props.slides &&
                                    props.slides.map((single, key) => {
                                        return (
                                            <HeroSliderTwentyTwoSingle
                                                data={single}
                                                key={key}
                                                sliderClass="swiper-slide"
                                            />
                                        );
                                    })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default HeroSliderTwentyTwo;
