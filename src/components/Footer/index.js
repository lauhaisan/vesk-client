import React, { Component } from "react";
import "./index.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="footerWrapper">
        <div className="viewText">
          <p className="viewText--textTop">
            © Copyright 2020{" "}
            <span className="viewText--textTop--bold">Vesk</span>. All Rights
            Reserved
          </p>
        </div>
        <div className="viewStore">
          <a
            href="https://drive.google.com/file/d/1b-Y5nFgdbVTC1jVgtFMkN64FLwmdisHd/view"
            target="_blank"
            rel="noopener noreferrer"
            id="google-play-logo"
          >
            <img
              className="viewStore__logo"
              src={require("../../images/google.png")}
              alt="google-play-logo"
            />
          </a>
          <a
            href="https://www.apple.com/ios/app-store/"
            target="_blank"
            rel="noopener noreferrer"
            id="google-play-logo"
          >
            <img
              className="viewStore__logo"
              src={require("../../images/apple.png")}
              alt="app-store-logo"
            />
          </a>
        </div>
      </footer>
    );
  }
}
export default Footer;
