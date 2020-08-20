import React, { Component } from "react";
import Slider from "react-slick";
import "./index.scss";

class CustomSlide extends Component {
  render() {
    const { itemUser = {}, ...props } = this.props;
    return (
      <div {...props}>
        <div className="itemSlider__content">
          <img
            className="itemSlider__content--avt"
            src={require("../../../../images/testAvatar.jpg")}
            alt="img-avatar"
          />
          <p className="itemSlider__content--name">{itemUser.userName}</p>
          <p className="itemSlider__content--views">74,853 views</p>
        </div>
      </div>
    );
  }
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style
      }}
      onClick={onClick}
    />
  );
}

export default class MultipleItems extends Component {
  render() {
    const { listData = [] } = this.props;
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 9,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2500,
      dots: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="containerSlider">
        <Slider {...settings}>
          {listData.map(item => (
            <CustomSlide
              key={item.userId}
              className="itemSlider"
              itemUser={item}
            />
          ))}
        </Slider>
      </div>
    );
  }
}
