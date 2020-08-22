import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./index.scss";

class CustomSlide extends Component {
  render() {
    const { itemUser = {}, history, ...props } = this.props;
    const id = itemUser.userId;
    return (
      <div {...props}>
        <div className="itemSlider__content">
          <Link to={`/channel/${id}`}>
            <img
              className="itemSlider__content--avt"
              src={itemUser.avatar}
              alt="img-avatar"
            />
          </Link>
          <Link
            style={{ width: "70%", cursor: "pointer", textDecoration: "none" }}
            to={`/channel/${id}`}
          >
            <div className="itemSlider__content--name">{itemUser.userName}</div>
          </Link>
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
        ...style,
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
        ...style,
      }}
      onClick={onClick}
    />
  );
}

export default class MultipleItems extends Component {
  render() {
    const { listData = [], history } = this.props;
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
          breakpoint: 1350,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 1140,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="containerSlider">
        <Slider {...settings}>
          {listData.map((item) => (
            <CustomSlide
              key={item.userId}
              className="itemSlider"
              itemUser={item}
              history={history}
            />
          ))}
        </Slider>
      </div>
    );
  }
}
