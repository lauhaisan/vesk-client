import React from "react";
import TitlePage from "../../components/TitlePage";
import { connect } from "react-redux";
import numeral from "numeral";
import Notification from "../../components/Notification";
import NotFoundPage from "../404Page";
import { SOCIAL_MEDIA, COMMENTS, MOST_POPULAR } from "../../constant";
import ItemVideoVertical from "../../components/ItemVideoVertical";
// import ButtonLoading from "../../components/ButtonLoading";
import Player from "./components/Player";
import Comments from "./components/Comments";
import "./index.scss";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      id: "",
      timerStart: 0,
      timerTime: 0
    };
  }

  componentDidMount() {
    const {
      match: { params: { id = "" } = {} } = {},
      getById,
      getListComment = () => {},
      getListMostPopular
    } = this.props;
    getById(id);
    getListComment(id);
    getListMostPopular({});
    this.setState({
      id
    });
  }

  componentDidUpdate() {
    const {
      match: { params: { id: idParams = "" } = {} } = {},
      getById,
      getListComment = () => {},
      itemMediaSocial: { timeForRecvCoin } = {}
    } = this.props;
    const { id, timerTime, complete } = this.state;
    if (id !== idParams) {
      getById(idParams);
      getListComment(idParams);
      this.setState({
        id: idParams,
        complete: false,
        timerStart: 0,
        timerTime: 0
      });
      this.stopTimer();
    }
    if (timerTime > timeForRecvCoin * 60000 && !complete) {
      this.checkComplete();
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    const { updateStateReducer, updateStateCommentReducer } = this.props;
    updateStateReducer({
      itemMediaSocial: {}
    });
    updateStateCommentReducer({
      listComment: [],
      paging: {},
      messageErrorComment: ""
    });
  }

  startTimer = () => {
    this.setState({
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  handleAddComment = comment => {
    const { addComment, itemMediaSocial: { id = "" } = {} } = this.props;
    const payload = {
      postId: id,
      comment,
      title: "My Comment"
    };
    addComment(payload);
  };

  checkComplete = () => {
    this.setState({
      complete: true
    });
  };

  render() {
    const {
      itemMediaSocial = {},
      messageError = "",
      fetchingComment,
      listComment = [],
      listUserData = [],
      // messageErrorComment,
      loadingAction,
      // actionSuccessfully,
      // loadingMostPopular,
      listMostPopular = []
    } = this.props;
    const {
      name = "",
      videoUrl: url = "",
      countView = 0,
      authorId = "",
      timeForRecvCoin,
      pointForUserView
    } = itemMediaSocial;
    const { complete, id, timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    if (messageError === "Id not found") {
      return <NotFoundPage />;
    }
    const stringCountView = numeral(countView).format("0,0");
    const itemChanel =
      listUserData.find(element => element.userId === authorId) || {};
    const formatListVideoMostPopular = listMostPopular.map(item => {
      return {
        ...item,
        author: listUserData.find(element => element.userId === item.authorId)
      };
    });
    const filterListVideoMostPopular = formatListVideoMostPopular.filter(
      item => item.id !== id
    );
    return (
      <div className="container__detail">
        <TitlePage title={name} />
        <div className="detail__viewRow">
          <Player
            url={url}
            startTimer={!complete ? this.startTimer : undefined}
            stopTimer={!complete ? this.stopTimer : undefined}
          />
          <div className="rightList" style={{ height: "315px" }}>
            <div className="scrollView">
              {filterListVideoMostPopular.map(item => (
                <ItemVideoVertical key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        {!complete && (
          <div className="Stopwatch-display">
            You have viewed {hours} : {minutes} : {seconds} : {centiseconds}.
            You receive {pointForUserView} CXC for watching {timeForRecvCoin}{" "}
            minutes.
          </div>
        )}

        <div className="viewAds">
          <a
            href="https://vinhomes.vn/"
            target="_blank"
            rel="noopener noreferrer"
            id="ads"
            className="contentAds"
          >
            <img
              className="viewAds__img"
              src="https://phumyhungreals.com/wp-content/uploads/2020/02/vinhome-central-park.jpg"
              alt="img-avatar"
            />
          </a>
        </div>
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
                  src={
                    itemChanel.avatar || require("../../images/testAvatar.jpg")
                  }
                  alt="img-avatar"
                />
                <p className="boxInfoChanel__name">{itemChanel.userName}</p>
              </div>
              {/* <ButtonLoading
                onClick={() => alert("SUB")}
                text="Subscribe"
                style={{
                  width: "140px",
                  height: "38px",
                  fontSize: "16px",
                }}
              /> */}
            </div>
            <Comments
              listComment={listComment}
              loadingComment={fetchingComment}
              loadingActionComment={loadingAction}
              handleAddComment={this.handleAddComment}
            />
          </div>
          <div
            className="rightList"
            style={{ backgroundColor: "transparent", boxShadow: "none" }}
          >
            {filterListVideoMostPopular.map(item => (
              <ItemVideoVertical key={item.id} item={item} />
            ))}
          </div>
        </div>
        {complete && (
          <Notification
            status="success"
            message=""
            timeout={10000}
            title={`You receive ${pointForUserView} CXC`}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({
  socialMedia: { itemMediaSocial = {}, loadingGetById, messageError } = {},
  comment: {
    loading: fetchingComment,
    listComment = [],
    // paging {},
    messageErrorComment = "",
    loadingAction = false,
    actionSuccessfully = ""
  } = {},
  listUser: { listUserData = [] } = {},
  mostPopular: { loading: loadingMostPopular, listMostPopular = [] } = {}
}) => ({
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
  listMostPopular
});

const mapDispatchToProps = dispatch => ({
  getById: id => dispatch({ type: SOCIAL_MEDIA.GET_BY_ID, data: { id } }),
  getListComment: data =>
    dispatch({ type: COMMENTS.GET_LIST_COMMENTS, data: { data } }),
  addComment: data => dispatch({ type: COMMENTS.ADD_COMMENT, data: { data } }),
  updateStateReducer: data =>
    dispatch({ type: SOCIAL_MEDIA.UPDATE_SOCIAL_MEDIA_REDUCER, data }),
  updateStateCommentReducer: data =>
    dispatch({ type: COMMENTS.UPDATE_STATE_COMMENT_REDUCER, data }),
  getListMostPopular: data =>
    dispatch({ type: MOST_POPULAR.GET_LIST_POPULAR, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
