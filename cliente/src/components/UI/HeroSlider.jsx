import React from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
    const settings = {
        fade: true,
        speed: 2000,
        autoplaySpeed: 3000,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
    };
    return (
        <Slider {...settings} className="hero__slider">
        <div className="slider__item slider__item-01 mt0">
        <Container>
        <div className="slider__content ">
     
         <h1 className="display-4 text-uppercase text-center mb-5">Bienvenidos a Friend's Car Rent</h1>
        </div>
      </Container>
    </div>

    <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content ">
            <h1 className="display-4 text-uppercase text-center mb-5">Bienvenidos a Friend's Car Rent</h1>
          </div>
        </Container>
      </div>
      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content ">        
          <h1 className="display-4 text-uppercase text-center mb-5">Bienvenidos a Friend's Car Rent</h1>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-04 mt0">
        <Container>
          <div className="slider__content ">        
          <h1 className="display-4 text-uppercase text-center mb-5">Bienvenidos a Friend's Car Rent</h1>
          </div>
        </Container>
      </div>
    </Slider>
    
 );
};
    
export default HeroSlider;