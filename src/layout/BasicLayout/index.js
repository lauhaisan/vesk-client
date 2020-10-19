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
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });
  }

  _handleMenu = () => {
    const { openMenu, setDataUserReducer } = this.props;
    setDataUserReducer({
      openMenu: !openMenu,
    });
  };

  handleClose = () => {
    const { setDataUserReducer } = this.props;
    setDataUserReducer({
      hideAds: true,
    });
  };

  randomAds = (list) => {
    let itemAds = {};
    if (list.length > 0) {
      itemAds = list[Math.floor(Math.random() * list.length)];
    }
    return itemAds;
  };

  render() {
    const {
      children,
      history,
      openMenu,
      windowWidth,
      hideAds,
      listAds,
      loadingAds,
    } = this.props;
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

    const listAdsBottom = listAds.filter(
      (item) => item.position === "FIX_BOTTOM"
    );
    const random = this.randomAds(listAdsBottom);
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
              <div className="content">
                <Fragment>
                  {children}
                  {!hideAds && (
                    <div className="view1FixBottom">
                      <div style={{ width: "70%", position: "relative" }}>
                        {random.imageUrl && (
                          <Fragment>
                            <a
                              href={random.linkTarget}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="content1"
                            >
                              <img
                                className="view1FixBottom__img"
                                src={random.imageUrl}
                                alt="img-avatar"
                              />
                            </a>
                          </Fragment>
                        )}
                        {listAdsBottom.length === 0 && !loadingAds && (
                          <Fragment>
                            <a
                              href="https://kingofsolutions.global"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="content1"
                            >
                              <img
                                className="view1FixBottom__img"
                                src="https://statics.veskhub.co/98569664-fd45-11ea-bd57-5600023ed650.jpg"
                                alt="img-avatar"
                              />
                            </a>
                          </Fragment>
                        )}

                        <div
                          className="content1__close"
                          onClick={this.handleClose}
                        >
                          [X]
                        </div>
                      </div>
                    </div>
                  )}
                </Fragment>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  user: { openMenu, hideAds } = {},
  advertising: { listAds = [], loading: loadingAds } = {},
}) => ({
  openMenu,
  hideAds,
  listAds,
  loadingAds,
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
