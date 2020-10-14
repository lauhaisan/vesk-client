import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { SOCIAL_MEDIA } from "../../constant";
import Slider from "./components/Slider";
import Notification from "../../components/Notification";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import Spin from "../../components/Spin";
import "./index.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 2,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.handleGetListSocialMedia({ page: 1, limit: 10 });
  }

  handleGetListSocialMedia = (payload) => {
    const { getListSocialMedia } = this.props;
    getListSocialMedia(payload);
  };

  fetchMoreData = () => {
    const { page } = this.state;
    const { listSocialMedia = [], loadMore = () => {} } = this.props;
    const total = 29;
    if (listSocialMedia.length >= total) {
      this.setState({ hasMore: false });
      return;
    }
    loadMore({ page, limit: 10 });
    this.setState({ page: page + 1 });
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
      listSocialMedia = [],
      messageError,
      loadingListUserName,
      listUserData = [],
      messageErrorListUser,
      listAds = [],
      history,
    } = this.props;
    const { hasMore } = this.state;
    const formatListVideo = listSocialMedia.map((item) => {
      return {
        ...item,
        author: listUserData.find(
          (element) => element.userId === item.authorId
        ),
      };
    });

    const filterListActive = formatListVideo.filter(
      (element) => element.status !== "INACTIVE"
    );

    const error = messageErrorListUser !== "" || messageError !== "";
    const _renderLoading = (
      <div className="viewLoading">
        <Spin />
      </div>
    );
    const randomAds = this.randomAds(listAds);

    return (
      <Fragment>
        <div className="container_page_home">
          <TitlePage title="Home" />
          <div className="titleBlock">
            <p className="titleBlock__text">Chanels Categories</p>
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
          {randomAds.imageUrl && (
            <div className="viewAds">
              <a
                href={randomAds.LinkTarget}
                target="_blank"
                rel="noopener noreferrer"
                className="contentAds"
              >
                <img
                  className="viewAds__img"
                  src={randomAds.imageUrl}
                  alt="img-avatar"
                />
              </a>
            </div>
          )}

          <div className="divider" style={{ marginTop: "1rem" }} />
          <div className="titleBlock">
            <p className="titleBlock__text">Featured Videos</p>
          </div>
          <InfiniteScroll
            dataLength={filterListActive.length}
            next={this.fetchMoreData}
            hasMore={hasMore}
            loader={_renderLoading}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            style={{ overflow: "hidden" }}
          >
            <div className="bx--row">
              {filterListActive.map((item) => (
                <div key={item.id} className="bx--col-md-2 bx--col-sm-4">
                  <ItemVideo item={item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
        {error && (
          <Notification
            status="error"
            message={messageError || messageErrorListUser}
            title="Process Failed"
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  socialMedia: {
    loading,
    listSocialMedia = [],
    messageError = "",
    paging: { total = 0 } = {},
  } = {},
  listUser: {
    loading: loadingListUserName,
    listUserData = [],
    messageError: messageErrorListUser = "",
  } = {},
  advertising: { listAds = [] } = {},
}) => ({
  loading,
  listSocialMedia,
  total,
  messageError,
  loadingListUserName,
  listUserData,
  messageErrorListUser,
  listAds,
});

const mapDispatchToProps = (dispatch) => ({
  getListSocialMedia: (data) =>
    dispatch({ type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA, data }),
  loadMore: (data) =>
    dispatch({ type: SOCIAL_MEDIA.LOAD_MORE_LIST_VIDEO, data }),
  updateStore: (data) =>
    dispatch({ type: SOCIAL_MEDIA.UPDATE_SOCIAL_MEDIA_REDUCER, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
