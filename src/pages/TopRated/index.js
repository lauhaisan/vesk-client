import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Empty from "../../components/Empty";
import { TOP_RATED } from "../../constant";
import Notification from "../../components/Notification";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import Spin from "../../components/Spin";
import "./index.scss";

class TopRated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 2,
    };
  }
  componentDidMount() {
    const { getListTopRated } = this.props;
    getListTopRated({ page: 1, limit: 10 });
  }

  sortByTopRank = (list) => {
    const listSort = list.sort((item, nextItem) => {
      return item.topRank - nextItem.topRank;
    });
    return listSort;
  };

  randomAds = (list) => {
    let itemAds = {};
    if (list.length > 0) {
      itemAds = list[Math.floor(Math.random() * list.length)];
    }
    return itemAds;
  };

  fetchMoreData = () => {
    const { page } = this.state;
    const { listTopRated = [], loadMore = () => {}, total } = this.props;
    if (listTopRated.length >= total) return;
    loadMore({ page, limit: 10 });
    this.setState({ page: page + 1 });
  };

  render() {
    const {
      listTopRated = [],
      listUserData = [],
      messageErrorTopRated = "",
      listAds = [],
      loadingAds,
      total,
    } = this.props;

    const check = listTopRated.length >= total;
    const listAdsTopRate = listAds.filter(
      (item) => item.position === "TOP_RATED"
    );
    const randomAds = this.randomAds(listAdsTopRate);

    const _renderLoading = (
      <div className="viewLoading">
        <Spin />
      </div>
    );

    const formatListVideo = listTopRated.map((item) => {
      return {
        ...item,
        author: listUserData.find(
          (element) => element.userId === item.authorId
        ),
      };
    });

    const sortListTopRank = this.sortByTopRank(formatListVideo) || [];
    const filterListActive = sortListTopRank.filter(
      (element) => element.status !== "INACTIVE"
    );

    return (
      <Fragment>
        <div className="container_page_topRated">
          <TitlePage title="Top Rated" />
          {listAdsTopRate.length === 0 && !loadingAds && (
            <div className="viewAdsTopRated">
              <a
                href="https://kingofsolutions.global"
                target="_blank"
                rel="noopener noreferrer"
                className="contentAds"
              >
                <img
                  className="viewAdsTopRated__img"
                  src="https://statics.veskhub.co/98569664-fd45-11ea-bd57-5600023ed650.jpg"
                  alt="img-avatar"
                />
              </a>
            </div>
          )}
          {randomAds.imageUrl && (
            <div className="viewAdsTopRated">
              <a
                href={randomAds.linkTarget}
                target="_blank"
                rel="noopener noreferrer"
                className="contentAds"
              >
                <img
                  className="viewAdsTopRated__img"
                  src={randomAds.imageUrl}
                  alt="img-avatar"
                />
              </a>
            </div>
          )}
          <div className="titleBlock">
            <p className="titleBlock__text">Top Rated Videos</p>
          </div>

          {filterListActive.length === 0 ? (
            <Empty text="No Video" />
          ) : (
            <InfiniteScroll
              dataLength={filterListActive.length}
              next={this.fetchMoreData}
              hasMore={!check}
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
          )}
        </div>

        {messageErrorTopRated !== "" && (
          <Notification
            status="error"
            message={messageErrorTopRated}
            title="Process Failed"
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  topRated: {
    loading,
    listTopRated = [],
    messageErrorTopRated = "",
    paging: { total } = {},
  } = {},
  listUser: { listUserData = [] } = {},
  advertising: { listAds = [], loading: loadingAds } = {},
}) => ({
  loading,
  listTopRated,
  messageErrorTopRated,
  total,
  listUserData,
  listAds,
  loadingAds,
});

const mapDispatchToProps = (dispatch) => ({
  getListTopRated: (data) =>
    dispatch({ type: TOP_RATED.GET_LIST_TOP_RATED, data }),
  loadMore: (data) => dispatch({ type: TOP_RATED.LOAD_MORE_TOP_RATED, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRated);
