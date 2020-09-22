import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  OverflowMenu,
  OverflowMenuItem,
  Loading,
} from "carbon-components-react";
import { SOCIAL_MEDIA, LIST_USER } from "../../constant";
import Notification from "../../components/Notification";
import Empty from "../../components/Empty";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import NotFoundPage from "../404Page";
import "./index.scss";

class SignleChannel extends Component {
  componentDidMount() {
    const {
      match: { params: { id = "" } = {} } = {},
      getUserInfo,
      getListSocialMediaByAuthor,
    } = this.props;
    getUserInfo({ data: id });
    getListSocialMediaByAuthor({ id });
  }

  componentWillUnmount() {
    const {
      updateStateListUserReducer,
      updateStateSocialMediaReducer,
    } = this.props;
    updateStateListUserReducer({
      itemUser: {},
    });
    updateStateSocialMediaReducer({
      listByAuthor: [],
    });
  }

  render() {
    const {
      itemUser = {},
      loading,
      listByAuthor = [],
      listUserData = [],
      messageError = "",
    } = this.props;

    const { firstName = "", lastName = "", avatar } = itemUser;

    if (messageError === "User not exist") {
      return <NotFoundPage />;
    }
    const _renderLoading = (
      <div className="viewLoading">
        <Loading withOverlay={false} />
      </div>
    );

    const formatListVideo = listByAuthor.map((item) => {
      return {
        ...item,
        author: listUserData.find(
          (element) => element.userId === item.authorId
        ),
      };
    });

    return (
      <Fragment>
        <TitlePage title={`${firstName} ${lastName}`} />
        <div className="singleChanel">
          <div className="coverImage">
            <div className="singleChanel__profile">
              <img
                className="singleChanel__profile__avt"
                src={avatar || require("../../images/testAvatar.jpg")}
                alt="img-avatar"
              />
              <div className="singleChanel__profile__social">Social Media</div>
            </div>
          </div>
          <div className="singleChanel__nameChanel">
            <p className="singleChanel__nameChanel--text">
              {`${firstName} ${lastName}`}
            </p>
          </div>
        </div>
        <div className="container_page_singleChanel">
          <div className="titleBlock">
            <p className="titleBlock__text">Videos</p>
            <div className="titleBlock__btn">
              <OverflowMenu
                renderIcon={() => <i className="fas fa-ellipsis-h icon"></i>}
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
              {formatListVideo.length === 0 ? (
                <Empty text="No Video" />
              ) : (
                formatListVideo.map((item) => (
                  <div key={item.id} className="bx--col-md-2 bx--col-sm-4">
                    <ItemVideo item={item} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {messageError !== "" && (
          <Notification
            status="error"
            message={messageError}
            title="Process Failed"
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  socialMedia: { loading, listByAuthor = [] } = {},
  listUser: { listUserData = [], itemUser, messageError = "" } = {},
}) => ({
  loading,
  listByAuthor,
  listUserData,
  itemUser,
  messageError,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (data) => dispatch({ type: LIST_USER.GET_USER_BY_ID, data }),
  getListSocialMediaByAuthor: (data) =>
    dispatch({ type: SOCIAL_MEDIA.GET_LIST_BY_AUTHOR, data: { data } }),
  updateStateListUserReducer: (data) =>
    dispatch({ type: LIST_USER.UPDATE_LIST_USER_REDUCER, data }),
  updateStateSocialMediaReducer: (data) =>
    dispatch({ type: SOCIAL_MEDIA.UPDATE_SOCIAL_MEDIA_REDUCER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignleChannel);
