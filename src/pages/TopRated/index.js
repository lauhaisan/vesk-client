import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Loading } from "carbon-components-react";
import Empty from "../../components/Empty";
import { TOP_RATED } from "../../constant";
import Notification from "../../components/Notification";
import ItemVideo from "../../components/ItemVideo";
import TitlePage from "../../components/TitlePage";
import "./index.scss";

class TopRated extends Component {
  componentDidMount() {
    const { getListTopRated } = this.props;
    getListTopRated({});
  }

  sortByTopRank = (list) => {
    const listSort = list.sort((item, nextItem) => {
      return item.topRank - nextItem.topRank;
    });
    return listSort;
  };

  render() {
    const {
      loading,
      listTopRated = [],
      listUserData = [],
      messageErrorTopRated = "",
    } = this.props;

    const _renderLoading = (
      <div className="viewLoading">
        <Loading withOverlay={false} />
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

    return (
      <Fragment>
        <div className="container_page_topRated">
          <TitlePage title="Top Rated" />
          <div className="titleBlock">
            <p className="titleBlock__text">Top Rated Videos</p>
          </div>
          {loading ? (
            _renderLoading
          ) : (
            <div className="bx--row">
              {sortListTopRank.length === 0 ? (
                <Empty text="No Video" />
              ) : (
                sortListTopRank.map((item) => (
                  <div key={item.id} className="bx--col-md-2 bx--col-sm-4">
                    <ItemVideo item={item} />
                  </div>
                ))
              )}
            </div>
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
  topRated: { loading, listTopRated = [], messageErrorTopRated = "" } = {},
  listUser: { listUserData = [] } = {},
}) => ({
  loading,
  listTopRated,
  messageErrorTopRated,
  listUserData,
});

const mapDispatchToProps = (dispatch) => ({
  getListTopRated: (data) =>
    dispatch({ type: TOP_RATED.GET_LIST_TOP_RATED, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRated);
