import React from "react";
import TitlePage from "../../components/TitlePage";
import { connect } from "react-redux";
import numeral from "numeral";
import Notification from "../../components/Notification";
import NotFoundPage from "../404Page";
import { SOCIAL_MEDIA, COMMENTS } from "../../constant";
import ButtonLoading from "../../components/ButtonLoading";
import Player from "./components/Player";
import Comments from "./components/Comments";
import "./index.scss";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id = "" } = {} } = {} } = this.props;
    const { getById, getListComment = () => {} } = this.props;
    getById(id);
    getListComment(id);
  }

  componentWillUnmount() {
    const { updateStateReducer, updateStateCommentReducer } = this.props;
    updateStateReducer({
      itemMediaSocial: {},
    });
    updateStateCommentReducer({
      listComment: [],
      paging: {},
      messageErrorComment: "",
    });
  }

  handleAddComment = (comment) => {
    const { addComment, itemMediaSocial: { id = "" } = {} } = this.props;
    const payload = {
      postId: id,
      comment,
      title: "My Comment",
    };
    addComment(payload);
  };

  checkComplete = (value) => {
    this.setState({
      complete: value,
    });
  };

  render() {
    const {
      itemMediaSocial = {},
      messageError = "",
      fetchingComment,
      listComment = [],
      // messageErrorComment,
      loadingAction,
      // actionSuccessfully,
    } = this.props;
    const { name = "", videoUrl: url = "", countView = 0 } = itemMediaSocial;
    const { complete } = this.state;
    if (messageError === "Id not found") {
      return <NotFoundPage />;
    }
    const stringCountView = numeral(countView).format("0,0");

    return (
      <div className="container__detail">
        <TitlePage title={name} />
        <div className="detail__viewRow">
          <Player url={url} checkComplete={this.checkComplete} />
          <div className="rightList" style={{ height: "315px" }}>
            List video vertical
          </div>
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
                  src={require("../../images/testAvatar.jpg")}
                  alt="img-avatar"
                />
                <p className="boxInfoChanel__name">NAME CHANEL</p>
              </div>
              <ButtonLoading
                onClick={() => alert("SUB")}
                text="Subscribe"
                style={{
                  width: "140px",
                  height: "38px",
                  fontSize: "16px",
                }}
              />
            </div>
            <Comments
              listComment={listComment}
              loadingComment={fetchingComment}
              loadingActionComment={loadingAction}
              handleAddComment={this.handleAddComment}
            />
          </div>
          <div className="rightList">List video vertical</div>
        </div>
        {complete && (
          <Notification
            status="success"
            message=""
            title="You receive 10 CXC"
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
    actionSuccessfully = "",
  } = {},
}) => ({
  itemMediaSocial,
  loadingGetById,
  messageError,
  fetchingComment,
  listComment,
  messageErrorComment,
  loadingAction,
  actionSuccessfully,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
