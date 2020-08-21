import React, { Component } from "react";
import { TextArea } from "carbon-components-react";
import ButtonOutline from "../../../../components/ButtonOutline";
import ButtonLoading from "../../../../components/ButtonLoading";
import "./index.scss";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textComment: ""
    };
  }

  handleChangeComment = value => {
    this.setState({
      textComment: value
    });
  };

  handleSubmit = () => {
    const { textComment } = this.state;
    alert(textComment);
  };

  render() {
    const { textComment = "" } = this.state;
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className="containerComments">
        <div className="viewTitleComment">Comments</div>
        <div className="commentEditor">
          <img
            className="avatarComment"
            src={require("../../../../images/testAvatar.jpg")}
            alt="img-avatar"
          />
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div className="viewEditor">
              <TextArea
                cols={0}
                id="composeComment"
                labelText=""
                hideLabel
                value={textComment}
                onChange={event => this.handleChangeComment(event.target.value)}
                placeholder="Add a public comment"
                rows={0}
              />
            </div>
            <div className="viewBtnComment">
              <div class="textTotalComments">10000 Comments</div>
              <div style={{ display: "flex" }}>
                <ButtonOutline
                  onClick={() =>
                    this.setState({
                      textComment: ""
                    })
                  }
                  disabled={false}
                  text="Cancel"
                  style={{
                    width: "7rem",
                    height: "30px"
                  }}
                />

                <ButtonLoading
                  onClick={this.handleSubmit}
                  // disabled={loading}
                  disabled={!textComment}
                  // loading={loading ? "yes" : undefined}
                  text="Comment"
                  style={{
                    width: "7rem",
                    height: "30px",

                    marginLeft: "10px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="listComments">
          {arr.map(item => (
            <div className="itemComment" key={item}>
              <img
                className="avatarComment"
                src={require("../../../../images/testAvatar.jpg")}
                alt="img-avatar"
              />
              <div className="itemComment__content">
                <div>
                  <span className="content--name">Gurdeep Osahan</span>
                  <span className="content--timeAgo">2 months ago</span>
                </div>
                <div className="content--textContent">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  odio urna, scelerisque et sapien non, sodales viverra velit.
                  Sed et cursus magna. Nullam in scelerisque diam. Nam posuere
                  pharetra dignissim. Sed ultrices a metus feugiat rhoncus. Sed
                  facilisis pharetra mi non tempus. Integer et rhoncus turpis,
                  sollicitudin ornare libero. Morbi dapibus ante a velit
                  tincidunt tincidunt. Donec porta luctus tincidunt. Cras
                  malesuada placerat augue, interdum condimentum enim laoreet
                  eget. Mauris porta a sem eu tincidunt.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
