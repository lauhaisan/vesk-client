import React, { Component } from "react";
import millify from "millify";
import "./index.scss";

class ItemVideo extends Component {
  timeAgo = prevDate => {
    const time = Date.parse(prevDate);
    const diff = Number(new Date()) - time;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
      case diff < minute:
        const seconds = Math.round(diff / 1000);
        return `${seconds} ${seconds > 1 ? "seconds" : "second"} ago`;
      case diff < hour:
        return Math.round(diff / minute) + " minutes ago";
      case diff < day:
        return Math.round(diff / hour) + " hours ago";
      case diff < month:
        return Math.round(diff / day) + " days ago";
      case diff < year:
        return Math.round(diff / month) + " months ago";
      case diff > year:
        return Math.round(diff / year) + " years ago";
      default:
        return "";
    }
  };
  render() {
    const { item = {} } = this.props;
    return (
      <div className="itemVideo">
        <div className="viewImgVideo">
          <div className="itemVideo__viewIconPlay">
            <i className="far fa-play-circle iconPlay"></i>
          </div>

          <img
            className="itemVideo__video"
            src="https://i.ytimg.com/vi/YnuSPC-S_yc/hqdefault.jpg?sqp=-oaymwEZCOADEI4CSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDtdEIdy1CUdr6jqsCxv4CFfB0BtQ"
            alt="img-video"
          />
        </div>
        <div className="itemVideo__info">
          <div className="info__title">{item.name}</div>
          <div className="info__nameChanel">Name Chanel</div>
          <div>
            <span className="info__viewAndTime" style={{ marginRight: "5px" }}>
              {item.countView ? `${millify(item.countView)} views` : "0 views"}
            </span>
            <i
              className="fas fa-calendar-alt info__viewAndTime"
              style={{ marginRight: "3px" }}
            ></i>
            <span className="info__viewAndTime">
              {this.timeAgo(item.created)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemVideo;
