import React, { Component } from "react";
import "./index.scss";

class ItemVideo extends Component {
  render() {
    return (
      <div className="itemVideo">
        <img
          className="itemVideo__video"
          src="https://i.ytimg.com/vi/YnuSPC-S_yc/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDtdEIdy1CUdr6jqsCxv4CFfB0BtQ"
          alt="img-video"
        />
        <div className="itemVideo__info">
          <div className="info__title">
            There are many variations of divassages of Lorem
          </div>
          <div className="info__nameChanel">Name Chanel</div>
          <div>
            <span className="info__viewAndTime" style={{ marginRight: "5px" }}>
              1.8M views
            </span>
            <i className="fas fa-calendar-alt info__viewAndTime"></i>
            <span className="info__viewAndTime">11 Months ago</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemVideo;
