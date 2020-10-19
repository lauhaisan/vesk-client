import React, { Fragment } from "react";
// import { Accordion, AccordionItem } from "carbon-components-react";
import { connect } from "react-redux";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
// import Filter from "./component/Filter";
import { WALLET } from "../../constant";
import { getToken } from "../../utils/token";
import { Redirect } from "react-router-dom";
import "./index.scss";

class HistoryPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.handlePagination(1);
  }

  handlePagination = (page) => {
    const { getListHistory } = this.props;
    const { data: { userId: id = "" } = {} } = getToken();
    getListHistory({ id, page, limit: 10 });
  };

  render() {
    const {
      loading,
      historyPoint: { items = [], paging: { total = 0 } = {} } = {},
    } = this.props;

    const headerData = [
      {
        header: "Created",
        key: "Created",
      },
      {
        header: "Message",
        key: "message",
      },
      {
        header: "Point",
        key: "money",
      },
    ];

    const { token } = getToken();
    if (!token) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <TitlePage title="Users" />
        <div className="containerHistoryPoint">
          <TableCommon
            title="History Point"
            rowData={items}
            headerData={headerData}
            loading={loading}
            total={total}
            handlePagination={this.handlePagination}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ wallet: { loading, historyPoint = {} } = {} }) => ({
  loading,
  historyPoint,
});

const mapDispatchToProps = (dispatch) => ({
  getListHistory: (data) =>
    dispatch({ type: WALLET.GET_HISTORY_POINT, data: { data } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPoint);
