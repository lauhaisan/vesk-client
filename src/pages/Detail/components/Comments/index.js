import React, { Component } from "react";
import { TextArea } from "carbon-components-react";
import ButtonOutline from "../../../../components/ButtonOutline";
import ButtonLoading from "../../../../components/ButtonLoading";
import { getToken } from "../../../../utils/token";
import "./index.scss";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textComment: "",
    };
  }

  handleChangeComment = (value) => {
    this.setState({
      textComment: value,
    });
  };

  handleSubmit = () => {
    const { handleAddComment } = this.props;
    const { textComment } = this.state;
    handleAddComment(textComment);
    this.setState({
      textComment: "",
    });
  };

  timeAgo = (prevDate) => {
    const time = Date.parse(prevDate);
    const diff = Number(new Date()) - time;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
      case diff < minute:
        const seconds = Math.round(diff / 1000);
        return `${seconds} ${seconds > 1 ? "seconds" : "second"} ago`;
      case diff < hour:
        return Math.round(diff / minute) + " minutes ago";
      case diff < day:
        return Math.round(diff / hour) + " hours ago";
      case diff < month:
        return Math.round(diff / day) + " days ago";
      case diff < year:
        return Math.round(diff / month) + " months ago";
      case diff > year:
        return Math.round(diff / year) + " years ago";
      default:
        return "";
    }
  };

  render() {
    const {
      listComment = [],
      // loadingComment,
      loadingActionComment,
    } = this.props;
    const { textComment = "" } = this.state;
    const { token } = getToken();

    return (
      <div className="containerComments">
        <div className="viewTitleComment">Comments</div>
        {token && (
          <div className="commentEditor">
            <img
              className="avatarComment"
              src={require("../../../../images/testAvatar.jpg")}
              alt="img-avatar"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div className="viewEditor">
                <TextArea
                  cols={0}
                  id="composeComment"
                  labelText=""
                  hideLabel
                  value={textComment}
                  onChange={(event) =>
                    this.handleChangeComment(event.target.value)
                  }
                  placeholder="Add a public comment"
                  rows={0}
                />
              </div>
              <div className="viewBtnComment">
                <div className="textTotalComments">
                  {listComment.length} Comments
                </div>
                <div style={{ display: "flex" }}>
                  <ButtonOutline
                    onClick={() =>
                      this.setState({
                        textComment: "",
                      })
                    }
                    disabled={false}
                    text="Cancel"
                    style={{
                      width: "7rem",
                      height: "30px",
                    }}
                  />

                  <ButtonLoading
                    onClick={this.handleSubmit}
                    disabled={!textComment || loadingActionComment}
                    loading={loadingActionComment ? "yes" : undefined}
                    text="Comment"
                    style={{
                      width: "7rem",
                      height: "30px",

                      marginLeft: "10px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="listComments">
          {listComment.map((item) => (
            <div className="itemComment" key={item.id}>
              <img
                className="avatarComment"
                src={require("../../../../images/testAvatar.jpg")}
                alt="img-avatar"
              />
              <div className="itemComment__content">
                <div>
                  <span className="content--name">{item.userName}</span>
                  <span className="content--timeAgo">
                    {this.timeAgo(item.createdAt)}
                  </span>
                </div>
                <div className="content--textContent">{item.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
