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
    // const { getListTopRated } = this.props;
    // getListTopRated({});
  }

  render() {
    const {
      loading,
      listTopRated = [],
      messageErrorTopRated = ""
    } = this.props;

    const _renderLoading = (
      <div className="viewLoading">
        <Loading withOverlay={false} />
      </div>
    );
    return (
      <Fragment>
        <div className="container_page_topRated">
          <TitlePage title="Top Rated" />
          <div className="titleBlock">
            <p className="titleBlock__text">Most Popular Videos</p>
          </div>
          {loading ? (
            _renderLoading
          ) : (
            <div className="bx--row">
              {listTopRated.length === 0 ? (
                <Empty text="No Video" />
              ) : (
                listTopRated.map(item => (
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
  topRated: { loading, listTopRated = [], messageErrorTopRated = "" } = {}
}) => ({
  loading,
  listTopRated,
  messageErrorTopRated
});

const mapDispatchToProps = dispatch => ({
  getListTopRated: data =>
    dispatch({ type: TOP_RATED.GET_LIST_TOP_RATED, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRated);
