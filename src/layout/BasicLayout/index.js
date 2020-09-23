import React, { Component, Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideMenu from "../../components/SideMenu";
import { LIST_USER, USER, WALLET, ADVERTISING } from "../../constant";
import windowSize from "react-window-size";
import { connect } from "react-redux";
import { getToken } from "../../utils/token";
import "./index.scss";

class BasicLayout extends Component {
  componentDidMount() {
    const { getListUser, getMyInfo, getWallet, getListAds } = this.props;
    const { data: { userId = "" } = {}, token } = getToken();
    getListUser({});
    getListAds();
    if (token) {
      getMyInfo(userId);
      getWallet();
    }
  }

  _handleMenu = () => {
    const { openMenu, setDataUserReducer } = this.props;
    setDataUserReducer({
      openMenu: !openMenu,
    });
  };

  render() {
    const { children, history, openMenu, windowWidth } = this.props;
    const isMobile = windowWidth < 768;
    const padding = openMenu ? "225px" : "90px";
    const renderSiderMobile = (
      <Fragment>
        <SideMenu
          history={history}
          openMenu={openMenu}
          handleMenuMobile={this._handleMenu}
        />
        <div className="backgroundSideMenuMobile" onClick={this._handleMenu} />
      </Fragment>
    );
    return (
      <Fragment>
        <div className="container_basic_layout">
          <Header history={history} handleMenu={this._handleMenu} />
          <div className="body">
            {isMobile && !openMenu ? (
              renderSiderMobile
            ) : (
              <SideMenu history={history} openMenu={openMenu} />
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: isMobile ? "0px" : padding,
                width: "100%",
              }}
            >
              <div className="content">{children}</div>
              <Footer />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user: { openMenu } = {} }) => ({
  openMenu,
});

const mapDispatchToProps = (dispatch) => ({
  setDataUserReducer: (data) => dispatch({ type: "UPDATE_STATE", data }),
  getListUser: (data) => dispatch({ type: LIST_USER.GET_LIST_USER, data }),
  getMyInfo: (data) => dispatch({ type: USER.GET_MY_INFO, data: { data } }),
  getWallet: () => dispatch({ type: WALLET.GET_WALLET }),
  getListAds: () => dispatch({ type: ADVERTISING.GET_LIST_ADS }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(BasicLayout));
