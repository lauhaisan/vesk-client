import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Spin from "../../components/Spin";
import Empty from "../../components/Empty";
import { MOST_POPULAR } from "../../constant";
import InfiniteScroll from "react-infinite-scroll-component";
import Notification from "../../components/Notification";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import "./index.scss";

class MostPopular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 2,
      hasMore: true,
    };
  }

  componentDidMount() {
    const { getListMostPopular } = this.props;
    getListMostPopular({ page: 1, limit: 10 });
  }

  sortByCountView = (list) => {
    const listSort = list.sort((item, nextItem) => {
      return item.countView - nextItem.countView;
    });
    return listSort.reverse();
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
    const { listMostPopular = [], loadMore = () => {}, total } = this.props;
    if (listMostPopular.length >= total) {
      this.setState({ hasMore: false });
      return;
    }
    loadMore({ page, limit: 10 });
    this.setState({ page: page + 1 });
  };

  render() {
    const {
      listMostPopular = [],
      listUserData = [],
      messageErrorMostPopular = "",
      listAds,
      loadingAds,
    } = this.props;

    const { hasMore } = this.state;

    const listAdsMostPopular = listAds.filter(
      (item) => item.position === "MOST_POPULAR"
    );
    const randomAds = this.randomAds(listAdsMostPopular);

    const formatListVideo = listMostPopular.map((item) => {
      return {
        ...item,
        author: listUserData.find(
          (element) => element.userId === item.authorId
        ),
      };
    });

    const sortListByCountView = this.sortByCountView(formatListVideo) || [];
    const filterListActive = sortListByCountView.filter(
      (element) => element.status !== "INACTIVE"
    );

    const _renderLoading = (
      <div className="viewLoading">
        <Spin />
      </div>
    );
    return (
      <Fragment>
        <div className="container_page_popular">
          {listAdsMostPopular.length === 0 && !loadingAds && (
            <div className="viewAdsMostPopular">
              <a
                href="https://kingofsolutions.global"
                target="_blank"
                rel="noopener noreferrer"
                className="contentAds"
              >
                <img
                  className="viewAdsMostPopular__img"
                  src="https://statics.veskhub.co/8cbba4ba-fd45-11ea-bd57-5600023ed650.jpg"
                  alt="img-avatar"
                />
              </a>
            </div>
          )}
          {randomAds.imageUrl && (
            <div className="viewAdsMostPopular">
              <a
                href={randomAds.linkTarget}
                target="_blank"
                rel="noopener noreferrer"
                className="contentAds"
              >
                <img
                  className="viewAdsMostPopular__img"
                  src={randomAds.imageUrl}
                  alt="img-avatar"
                />
              </a>
            </div>
          )}
          <TitlePage title="Top Rated" />
          <div className="titleBlock">
            <p className="titleBlock__text">Most Popular Videos</p>
          </div>
          {filterListActive.length === 0 ? (
            <Empty text="No Video" />
          ) : (
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
          )}
        </div>
        {messageErrorMostPopular !== "" && (
          <Notification
            status="error"
            message={messageErrorMostPopular}
            title="Process Failed"
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  mostPopular: {
    loading,
    listMostPopular = [],
    messageErrorMostPopular = "",
    paging: { total } = {},
  } = {},
  listUser: { listUserData = [] } = {},
  advertising: { listAds = [], loading: loadingAds } = {},
}) => ({
  loading,
  listMostPopular,
  messageErrorMostPopular,
  listUserData,
  listAds,
  loadingAds,
  total,
});

const mapDispatchToProps = (dispatch) => ({
  getListMostPopular: (data) =>
    dispatch({ type: MOST_POPULAR.GET_LIST_POPULAR, data }),
  loadMore: (data) =>
    dispatch({ type: MOST_POPULAR.LOAD_MORE_LIST_POPULAR, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MostPopular);
