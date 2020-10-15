import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Spin from "../../components/Spin";
import Empty from "../../components/Empty";
import { MOST_POPULAR } from "../../constant";
import Notification from "../../components/Notification";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import "./index.scss";

class MostPopular extends Component {
  componentDidMount() {
    const { getListMostPopular } = this.props;
    getListMostPopular({});
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

  render() {
    const {
      loading,
      listMostPopular = [],
      listUserData = [],
      messageErrorMostPopular = "",
      listAds,
      loadingAds,
    } = this.props;

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
        <div className="container_page_topRated">
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
          {loading ? (
            _renderLoading
          ) : (
            <div className="bx--row">
              {filterListActive.length === 0 ? (
                <Empty text="No Video" />
              ) : (
                filterListActive.map((item) => (
                  <div key={item.id} className="bx--col-md-2 bx--col-sm-4">
                    <ItemVideo item={item} />
                  </div>
                ))
              )}
            </div>
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
});

const mapDispatchToProps = (dispatch) => ({
  getListMostPopular: (data) =>
    dispatch({ type: MOST_POPULAR.GET_LIST_POPULAR, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MostPopular);
