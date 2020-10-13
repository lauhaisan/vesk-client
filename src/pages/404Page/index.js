import React, { Component } from "react";
import TitlePage from "../../components/TitlePage";

class NotFoundPage extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TitlePage title="404 Page Not Found" />
        <img
          src="https://static.mediacdn.vn/images/4041.gif"
          alt="404"
          width="50%"
          height="auto"
        />
      </div>
    );
  }
}

export default NotFoundPage;
