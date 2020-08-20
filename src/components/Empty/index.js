import React, { Component } from "react";
import "./index.scss";

export default class Empty extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className="emptyWrapper">
        <img
          className="empty__img"
          src={require("../../images/empty.png")}
          alt="img-empty"
        />
        <p className="empty__text">{text}</p>
      </div>
    );
  }
}
