import React, { Component } from "react";
import Slider from "react-slick";
import "./index.scss";

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return (
      <div {...props}>
        <div className="itemSlider__content">
          <img
            className="itemSlider__content--avt"
            src={require("../../../../images/testAvatar.jpg")}
            alt="img-avatar"
          />
          <p className="itemSlider__content--name">user name {index}</p>
          <p className="itemSlider__content--views">74,853 views</p>
        </div>
      </div>
    );
  }
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
}

export default class MultipleItems extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 9,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    const listItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return (
      <div className="containerSlider">
        <Slider {...settings}>
          {listItem.map((item) => (
            <CustomSlide className="itemSlider" index={item} />
          ))}
        </Slider>
      </div>
    );
  }
}
