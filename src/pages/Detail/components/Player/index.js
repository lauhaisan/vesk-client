import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./index.scss";

class ResponsivePlayer extends Component {
  handleProgress = ({ played, playedSeconds }) => {
    // played : percent watched, playedSeconds: sec
    const { checkComplete } = this.props;
    if (playedSeconds >= 10) {
      checkComplete(true);
    }
  };
  render() {
    const { url } = this.props;
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={url}
          width="100%"
          height="100%"
          controls={true}
          onProgress={this.handleProgress}
        />
      </div>
    );
  }
}

export default ResponsivePlayer;
