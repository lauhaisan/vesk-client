import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  OverflowMenu,
  OverflowMenuItem,
  Loading,
} from "carbon-components-react";
import { SOCIAL_MEDIA, LIST_USER } from "../../constant";
import Slider from "./components/Slider";
import Notification from "../../components/Notification";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import "./index.scss";

class Home extends Component {
  componentDidMount() {
    const { getListUser } = this.props;
    this.handleGetListSocialMedia({});
    getListUser({});
  }

  handleGetListSocialMedia = (payload) => {
    const { getListSocialMedia } = this.props;
    getListSocialMedia(payload);
  };

  render() {
    const {
      loading,
      listSocialMedia = [],
      messageError,
      loadingListUserName,
      listUserData = [],
      messageErrorListUser,
      history,
    } = this.props;
    const error = messageErrorListUser !== "" || messageError !== "";
    const _renderLoading = (
      <div className="viewLoading">
        <Loading withOverlay={false} />
      </div>
    );
    return (
      <Fragment>
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
            }}
          >
            {loadingListUserName ? (
              _renderLoading
            ) : (
              <Slider listData={listUserData} history={history} />
            )}
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
          {loading ? (
            _renderLoading
          ) : (
            <div className="bx--row">
              {listSocialMedia.map((item) => (
                <div
                  key={item.id}
                  className="bx--col--lg-3 bx--col-md-2 bx--col-sm-4"
                >
                  <ItemVideo item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
        {error && (
          <Notification
            status="error"
            message={messageError || messageErrorListUser}
            title="Edit User Failed"
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  socialMedia: { loading, listSocialMedia = [], messageError = "" } = {},
  listUser: {
    loading: loadingListUserName,
    listUserData = [],
    messageError: messageErrorListUser = "",
  } = {},
}) => ({
  loading,
  listSocialMedia,
  messageError,
  loadingListUserName,
  listUserData,
  messageErrorListUser,
});

const mapDispatchToProps = (dispatch) => ({
  getListSocialMedia: (data) =>
    dispatch({ type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA, data }),
  getListUser: (data) => dispatch({ type: LIST_USER.GET_LIST_USER, data }),

  // clearData: () => dispatch({ type: "CLEAR_DATA" }),
  // setData: data => dispatch({ type: "SET_STATE_REDUCER", data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
