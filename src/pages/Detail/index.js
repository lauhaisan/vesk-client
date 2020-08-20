import React from "react";
// import TitlePage from "../../components/TitlePage";
// import { connect } from "react-redux";
// import { TextArea } from "carbon-components-react";
// import { Redirect } from "react-router-dom";
import Player from "./components/Player";
// import ButtonLoading from "../../components/ButtonLoading";
// import ButtonOutline from "../../components/ButtonOutline";
// import { getToken } from "../../utils/token";
import "./index.scss";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.isComponentMounted = false;
    this.state = {
      complete: false,
    };
  }

  checkComplete = (value) => {
    this.setState({
      complete: value,
    });
  };

  render() {
    const { complete } = this.state;
    return (
      <div className="container__detail">
        <div className="viewPlayer">
          <Player
            url="https://www.youtube.com/watch?v=Nxs_mpWt2BA"
            checkComplete={this.checkComplete}
          />
        </div>
        {complete && <div>COMPLETE</div>}
      </div>
    );
  }
}
// const mapStateToProps = ({ products: { dummyListVideo } = {} }) => ({
//   dummyListVideo,
// });

// const mapDispatchToProps = (dispatch) => ({});

export default //  connect(mapStateToProps, mapDispatchToProps)
Detail;
