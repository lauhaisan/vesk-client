import React, { Component, PureComponent, Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import { connect } from "react-redux";
import numeral from "numeral";
import Notification from "../../components/Notification";
import NotFoundPage from "../404Page";
import { SOCIAL_MEDIA, COMMENTS, MOST_POPULAR, WALLET } from "../../constant";
import ItemVideoVertical from "../../components/ItemVideoVertical";
import Player from "./components/Player";
import Comments from "./components/Comments";
import { getToken } from "../../utils/token";
import "./index.scss";

class ItemAdvertising extends PureComponent {
  randomAds = (list) => {
    let itemAds = {};
    if (list.length > 0) {
      itemAds = list[Math.floor(Math.random() * list.length)];
    }
    return itemAds;
  };
  render() {
    const { listAds = [], key = "", loadingAds } = this.props;
    const listAdsDetail = listAds.filter((item) => item.position === "HOME");
    const randomAds = this.randomAds(listAdsDetail);
    const { imageUrl = "", linkTarget = "" } = randomAds;
    return (
      <Fragment>
        {listAdsDetail.length === 0 && !loadingAds && (
          <div className="viewAds">
            <a
              href="https://kingofsolutions.global"
              target="_blank"
              rel="noopener noreferrer"
              className="contentAds"
            >
              <img
                className="viewAds__img"
                src="https://statics.veskhub.co/98569664-fd45-11ea-bd57-5600023ed650.jpg"
                alt="img-avatar"
              />
            </a>
          </div>
        )}
        {imageUrl && (
          <div className="viewAds" key={key}>
            <a
              href={linkTarget}
              target="_blank"
              rel="noopener noreferrer"
              className="contentAds"
            >
              <img className="viewAds__img" src={imageUrl} alt="img-avatar" />
            </a>
          </div>
        )}
      </Fragment>
    );
  }
}

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      timerStart: 0,
      timerTime: 0,
      isLogin: false,
      idAdvertising: Date.now(),
    };
  }

  componentDidMount() {
    const {
      match: { params: { id = "" } = {} } = {},
      getById,
      getListComment = () => {},
      getListMostPopular,
    } = this.props;
    const { token } = getToken();
    getById(id);
    getListComment(id);
    getListMostPopular({});
    this.setState({
      id,
    });
    if (token) {
      this.setState({
        isLogin: true,
      });
    }
  }

  componentDidUpdate() {
    const {
      match: { params: { id: idParams = "" } = {} } = {},
      getById,
      getListComment = () => {},
      itemMediaSocial: { timeForRecvCoin } = {},
      updateWalletReducer,
    } = this.props;
    const { id, timerTime } = this.state;
    if (id !== idParams) {
      getById(idParams);
      getListComment(idParams);
      this.setState({
        id: idParams,
        complete: false,
        timerStart: 0,
        timerTime: 0,
        idAdvertising: Date.now(),
      });
      this.stopTimer();
      updateWalletReducer({ isRewaredViewSuccessfully: "" });
    }
    if (timerTime > timeForRecvCoin * 60000) {
      this.checkComplete();
    }
  }

  componentWillUnmount() {
    const {
      updateStateReducer,
      updateStateCommentReducer,
      updateWalletReducer,
    } = this.props;
    this.stopTimer();
    updateStateReducer({
      itemMediaSocial: {},
    });
    updateStateCommentReducer({
      listComment: [],
      paging: {},
      messageErrorComment: "",
    });
    updateWalletReducer({ isRewaredViewSuccessfully: "" });
  }

  startTimer = () => {
    this.setState({
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  handleAddComment = (comment) => {
    const { addComment, itemMediaSocial: { id = "" } = {} } = this.props;
    const payload = {
      postId: id,
      comment,
      title: "My Comment",
    };
    addComment(payload);
  };

  checkComplete = () => {
    const { isLogin } = this.state;
    const {
      rewardView,
      myInfo: { userId = "" } = {},
      itemMediaSocial: { id: videoId = "", authorId = "" } = {},
    } = this.props;
    this.stopTimer();
    if (userId !== authorId && isLogin) {
      this.setState(
        {
          timerStart: 0,
          timerTime: 0,
        },
        () => {
          this.startTimer();
        }
      );
      rewardView({ videoId });
    }
  };

  render() {
    const {
      myInfo: { userId = "" } = {},
      itemMediaSocial = {},
      messageError = "",
      fetchingComment,
      listComment = [],
      listUserData = [],
      loadingAction,
      listMostPopular = [],
      isRewaredViewSuccessfully = "",
      listAds = [],
      myInfo,
      loadingAds,
    } = this.props;
    const {
      name = "",
      videoUrl: url = "",
      countView = 0,
      authorId = "",
      timeForRecvCoin,
      pointForUserView,
    } = itemMediaSocial;
    const { id, timerTime, isLogin, idAdvertising } = this.state;
    const checkOwner = userId === authorId;
    // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    if (messageError === "Id not found") {
      return <NotFoundPage />;
    }
    const stringCountView = numeral(countView).format("0,0");
    const itemChanel =
      listUserData.find((element) => element.userId === authorId) || {};
    const { avatar = "", firstName = "", lastName = "" } = itemChanel;
    const fullName = `${firstName} ${lastName}`;

    const formatListVideoMostPopular = listMostPopular.map((item) => {
      return {
        ...item,
        author: listUserData.find(
          (element) => element.userId === item.authorId
        ),
      };
    });
    const filterListVideoMostPopular = formatListVideoMostPopular.filter(
      (item) => item.id !== id && item.status !== "INACTIVE"
    );

    return (
      <div className="container__detail">
        <TitlePage title={name} />
        <div className="detail__viewRow">
          <Player
            url={url}
            startTimer={!checkOwner ? this.startTimer : undefined}
            stopTimer={!checkOwner ? this.stopTimer : undefined}
          />
          <div className="rightList" style={{ height: "450px" }}>
            <div className="scrollView">
              {filterListVideoMostPopular.map((item) => (
                <ItemVideoVertical key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        {!checkOwner && isLogin && (
          <div className="Stopwatch-display">
            You have viewed {hours} : {minutes} : {seconds}. You receive{" "}
            {pointForUserView} point for watching {timeForRecvCoin} minutes.
          </div>
        )}
        <ItemAdvertising
          key={idAdvertising}
          listAds={listAds}
          loadingAds={loadingAds}
        />
        <div className="detail__viewRow" style={{ marginTop: "2rem" }}>
          <div className="viewLeft">
            <div className="box boxName">
              <p className="boxName__textName">{name}</p>
              <p className="boxName__textViews">
                <i className="fas fa-eye" style={{ marginRight: "5px" }}></i>
                {stringCountView} views
              </p>
            </div>
            <div className="box boxInfoChanel">
              <div className="boxInfoChanel__rightContent">
                <img
                  className="boxInfoChanel__avatar"
                  src={avatar || require("../../images/testAvatar.jpg")}
                  alt="img-avatar"
                />
                <p className="boxInfoChanel__name">{fullName}</p>
              </div>
            </div>
            <Comments
              listComment={listComment}
              loadingComment={fetchingComment}
              loadingActionComment={loadingAction}
              handleAddComment={this.handleAddComment}
              myInfo={myInfo}
            />
          </div>
          <div
            className="rightList"
            style={{ backgroundColor: "transparent", boxShadow: "none" }}
          >
            {filterListVideoMostPopular.map((item) => (
              <ItemVideoVertical key={item.id} item={item} />
            ))}
          </div>
        </div>
        {isRewaredViewSuccessfully === true && (
          <Notification
            status="success"
            message=""
            timeout={10000}
            title={`You receive ${pointForUserView} point`}
          />
        )}
        {isRewaredViewSuccessfully === false && (
          <Notification
            status="error"
            message=""
            timeout={10000}
            title="Reward Point Failed"
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({
  user: { myInfo = {} } = {},
  socialMedia: { itemMediaSocial = {}, loadingGetById, messageError } = {},
  comment: {
    loading: fetchingComment,
    listComment = [],
    messageErrorComment = "",
    loadingAction = false,
    actionSuccessfully = "",
  } = {},
  listUser: { listUserData = [] } = {},
  mostPopular: { loading: loadingMostPopular, listMostPopular = [] } = {},
  wallet: { isRewaredViewSuccessfully = "" },
  advertising: { listAds = [], loading: loadingAds } = {},
}) => ({
  myInfo,
  itemMediaSocial,
  loadingGetById,
  messageError,
  fetchingComment,
  listComment,
  messageErrorComment,
  loadingAction,
  actionSuccessfully,
  listUserData,
  loadingMostPopular,
  listMostPopular,
  isRewaredViewSuccessfully,
  listAds,
  loadingAds,
});

const mapDispatchToProps = (dispatch) => ({
  getById: (id) => dispatch({ type: SOCIAL_MEDIA.GET_BY_ID, data: { id } }),
  getListComment: (data) =>
    dispatch({ type: COMMENTS.GET_LIST_COMMENTS, data: { data } }),
  addComment: (data) =>
    dispatch({ type: COMMENTS.ADD_COMMENT, data: { data } }),
  updateStateReducer: (data) =>
    dispatch({ type: SOCIAL_MEDIA.UPDATE_SOCIAL_MEDIA_REDUCER, data }),
  updateStateCommentReducer: (data) =>
    dispatch({ type: COMMENTS.UPDATE_STATE_COMMENT_REDUCER, data }),
  getListMostPopular: (data) =>
    dispatch({ type: MOST_POPULAR.GET_LIST_POPULAR, data }),
  rewardView: (data) => dispatch({ type: WALLET.REWARD_VIEW, data: { data } }),
  updateWalletReducer: (data) =>
    dispatch({ type: WALLET.UPDATE_WALLET_REDUCER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
