import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  OverflowMenu,
  OverflowMenuItem,
  Loading
} from "carbon-components-react";
import { SOCIAL_MEDIA, LIST_USER } from "../../constant";
// import Notification from "../../components/Notification";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import "./index.scss";

class Home extends Component {
  componentDidMount() {
    const { match: { params: { id = "" } = {} } = {} } = this.props;
    console.log("id", id);
    const { getUserInfo } = this.props;
    getUserInfo({ data: id });
  }

  componentWillUnmount() {
    const { updateStateListUserReducer } = this.props;
    updateStateListUserReducer({
      itemUser: {}
    });
  }

  render() {
    const { itemUser = {}, loading, listSocialMedia = [] } = this.props;
    const _renderLoading = (
      <div className="viewLoading">
        <Loading withOverlay={false} />
      </div>
    );
    return (
      <Fragment>
        <TitlePage title="ABC" />
        <div className="singleChanel">
          <div className="coverImage">
            <div className="singleChanel__profile">
              <img
                className="singleChanel__profile__avt"
                src={require("../../images/testAvatar.jpg")}
                alt="img-avatar"
              />
              <div className="singleChanel__profile__social">Social</div>
            </div>
          </div>
          <div className="singleChanel__nameChanel">
            <p className="singleChanel__nameChanel--text">
              {itemUser.userName}
            </p>
          </div>
        </div>
        <div className="container_page_singleChanel">
          <div className="titleBlock">
            <p className="titleBlock__text">Videos</p>
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
              {listSocialMedia.map(item => (
                <div key={item.id} className="bx--col-md-2 bx--col-sm-4">
                  <ItemVideo item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* {messageErrorListUser !== "" ||
          (messageError !== "" && (
            <Notification
              status="error"
              message={messageError}
              title="Edit User Failed"
            />
          ))} */}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  // socialMedia: { loading, listSocialMedia = [], messageError = "" } = {},
  listUser: { itemUser, messageError = "" } = {}
}) => ({
  itemUser,
  messageError
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: data => dispatch({ type: LIST_USER.GET_USER_BY_ID, data }),
  updateStateListUserReducer: data =>
    dispatch({ type: LIST_USER.UPDATE_LIST_USER_REDUCER, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
