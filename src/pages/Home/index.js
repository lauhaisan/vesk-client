import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import { SOCIAL_MEDIA } from "../../constant";
import Slider from "./components/Slider";
import Notification from "../../components/Notification";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import Spin from "../../components/Spin";
import InfiniteScroll from "react-infinite-scroll-component";
import "./index.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      hasMore: true,
    };
  }

  componentDidMount() {
    const { page, limit } = this.state;
    this.handleGetListSocialMedia({ page, limit });
  }

  handleGetListSocialMedia = (payload) => {
    const { getListSocialMedia } = this.props;
    getListSocialMedia(payload);
  };

  fetchMoreData = () => {
    const { total, listSocialMedia = [] } = this.props;
    const { page, limit } = this.state;
    if (listSocialMedia.length >= 29) {
      this.setState({ hasMore: false });
      return;
    }
    this.setState({ page: page + 1 });
    this.handleGetListSocialMedia({ page: page + 1, limit });
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
      loading,
      listSocialMedia = [],
      messageError,
      loadingListUserName,
      listUserData = [],
      messageErrorListUser,
      listAds = [],
      history,
      total,
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
          {randomAds.ImageUrl && (
            <div className="viewAds">
              <a
                href={randomAds.LinkTarget}
                target="_blank"
                rel="noopener noreferrer"
                className="contentAds"
              >
                <img
                  className="viewAds__img"
                  src={randomAds.ImageUrl}
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
            dataLength={total}
            next={this.fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
