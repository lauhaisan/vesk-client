import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./index.scss";

class CustomSlide extends Component {
  render() {
    const { itemUser = {}, history, ...props } = this.props;
    const { avatar, firstName = "", lastName = "", userId: id = "" } = itemUser;
    return (
      <div {...props}>
        <div className="itemSlider__content">
          <Link to={`/channel/${id}`}>
            <img
              className="itemSlider__content--avt"
              src={avatar || require("../../../../images/testAvatar.jpg")}
              alt="img-avatar"
            />
          </Link>
          <Link
            style={{ width: "70%", cursor: "pointer", textDecoration: "none" }}
            to={`/channel/${id}`}
          >
            <div className="itemSlider__content--name">{`${firstName} ${lastName}`}</div>
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
    const total = listData.length;
    const slidesToShowSmall = total > 1 ? Math.floor(total / 2) : 1;
    const checkLength = total > 9;
    let slidesToScroll = 3;
    if (slidesToShowSmall < 3) {
      slidesToScroll = 1;
    }
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: checkLength ? 9 : slidesToShowSmall,
      slidesToScroll,
      autoplay: true,
      autoplaySpeed: 2500,
      dots: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: checkLength ? 9 : slidesToShowSmall,
            slidesToScroll,
          },
        },
        // {
        //   breakpoint: 1025,
        //   settings: {
        //     slidesToShow: checkLength ? 9 : slidesToShowSmall,
        //     slidesToScroll,
        //   },
        // },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: checkLength ? 6 : slidesToShowSmall,
            slidesToScroll,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: checkLength ? 3 : slidesToShowSmall,
            slidesToScroll,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: checkLength ? 2 : slidesToShowSmall,
            slidesToScroll,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll,
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
