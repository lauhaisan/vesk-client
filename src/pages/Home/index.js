import React, { Component } from "react";
import { connect } from "react-redux";
import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import Slider from "./components/Slider";
import ItemVideo from "./components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import "./index.scss";

class Home extends Component {
  // componentDidMount() {
  //   const { getAllProduct } = this.props;
  //   getAllProduct();
  // }

  componentWillUnmount() {
    const { clearData } = this.props;
    clearData();
  }
  render() {
    // const {
    // loading,
    // listProduct,
    // messageError,
    // clearData,
    //   // getAllProduct
    //   history
    // } = this.props;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 4];
    return (
      <div className="container_page_home">
        <TitlePage title="Home" />
        <div className="titleBlock">
          <p className="titleBlock__text">Chanels Categories</p>
          <div className="titleBlock__btn">
            <OverflowMenu
              renderIcon={() => <i className="fas fa-ellipsis-h icon"></i>}
              floatingMenu
              flipped
            >
              <OverflowMenuItem itemText={<div>Top Rated</div>} />
              <OverflowMenuItem itemText={<div>Viewed</div>} />
            </OverflowMenu>
          </div>
        </div>
        <div
          className="listChanel"
          style={{
            width: "100%",
            height: "8.5rem",
            backgroundColor: "#fff",
          }}
        >
          <Slider />
        </div>
        <div className="divider" />
        <div className="titleBlock">
          <p className="titleBlock__text">Featured Videos</p>
          <div className="titleBlock__btn">
            <OverflowMenu
              renderIcon={() => <i className="fas fa-ellipsis-h icon"></i>}
              floatingMenu
              flipped
            >
              <OverflowMenuItem itemText={<div>Top Rated</div>} />
              <OverflowMenuItem itemText={<div>Viewed</div>} />
            </OverflowMenu>
          </div>
        </div>
        <div className="bx--row">
          {arr.map((item) => (
            <div className="bx--col-md-2 bx--col-sm-4">
              <ItemVideo />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  products: {
    loading,
    listProduct = [],
    messageError = "",
    dummyListVideo,
  } = {},
}) => ({
  loading,
  listProduct,
  messageError,
  dummyListVideo,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProduct: () => dispatch({ type: "GET_ALL_PRODUCT" }),
  clearData: () => dispatch({ type: "CLEAR_DATA" }),
  setData: (data) => dispatch({ type: "SET_STATE_REDUCER", data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
