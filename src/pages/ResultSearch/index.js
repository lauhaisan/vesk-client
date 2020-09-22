import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Loading } from "carbon-components-react";
import Empty from "../../components/Empty";
import { SOCIAL_MEDIA } from "../../constant";
import { Redirect } from "react-router-dom";
import Notification from "../../components/Notification";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import "./index.scss";

class ResultSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kw: "",
    };
  }
  componentDidMount() {
    const { location: { state = "" } = {}, searchSocialMedia } = this.props;
    searchSocialMedia({ name: state });
    this.setState({
      kw: state,
    });
  }

  componentDidUpdate() {
    const { location: { state = "" } = {}, searchSocialMedia } = this.props;
    const { kw } = this.state;
    if (state !== kw) {
      searchSocialMedia({ name: state });
      this.setState({
        kw: state,
      });
    }
  }

  render() {
    const {
      loading,
      listSocialMedia = [],
      listUserData = [],
      messageError = "",
      location: { state = "" } = {},
    } = this.props;

    if (!state) {
      return <Redirect to="/" />;
    }

    const _renderLoading = (
      <div className="viewLoading">
        <Loading withOverlay={false} />
      </div>
    );

    const formatListVideo = listSocialMedia.map((item) => {
      return {
        ...item,
        author: listUserData.find(
          (element) => element.userId === item.authorId
        ),
      };
    });

    return (
      <Fragment>
        <div className="container_page_topRated">
          <TitlePage title="Search" />
          <div className="titleBlock">
            <p className="titleBlock__text">Search by "{state}"</p>
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
  socialMedia: { loading, listSocialMedia = [], messageError = "" } = {},
  listUser: { listUserData = [] } = {},
}) => ({
  loading,
  listSocialMedia,
  messageError,
  listUserData,
});

const mapDispatchToProps = (dispatch) => ({
  searchSocialMedia: (data) =>
    dispatch({
      type: SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA,
      data: { data },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultSearch);
