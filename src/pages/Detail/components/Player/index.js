import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./index.scss";

class ResponsivePlayer extends Component {
  render() {
    const {
      url = "",
      startTimer = () => {},
      stopTimer = () => {},
    } = this.props;

    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={url}
          width="100%"
          height="315px"
          controls={true}
          onPlay={startTimer}
          onPause={stopTimer}
          onEnded={stopTimer}
        />
      </div>
    );
  }
}

export default ResponsivePlayer;
