import React, { PureComponent } from "react";
import "./index.scss";

export default class Spin extends PureComponent {
  render() {
    return (
      <img
        className="spin"
        src={require("../../images/loading.gif")}
        alt="img-empty"
      />
    );
  }
}
