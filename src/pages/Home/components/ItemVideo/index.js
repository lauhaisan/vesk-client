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
        <div className="itemVideo__info">Info video</div>
      </div>
    );
  }
}

export default ItemVideo;
