import React, { Fragment } from "react";
import { Accordion, AccordionItem } from "carbon-components-react";
import { connect } from "react-redux";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import Filter from "./component/Filter";
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
    const { getListHistory } = this.props;
    const { data: { userId = "" } = {} } = getToken();
    getListHistory(userId);
  }

  _resetFilter = () => {
    console.log("reset filter");
  };

  _search = (value) => {
    console.log("value search", value);
  };

  render() {
    const { loading, historyPoint: { items = [] } = {} } = this.props;

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
      // {
      //   header: "User Id",
      //   key: "userId",
      // },
      // {
      //   header: "User Recv",
      //   key: "userIdRecv",
      // },
    ];

    const { token } = getToken();
    if (!token) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <TitlePage title="Users" />
        <div className="containerHistoryPoint">
          <Accordion className="viewFilter">
            <AccordionItem
              open
              title={
                <div className="viewFilter__title">
                  Filter
                  <i className="fas fa-filter viewFilter__title--icon"></i>
                </div>
              }
            >
              <Filter resetFilter={this._resetFilter} search={this._search} />
            </AccordionItem>
          </Accordion>
          <TableCommon
            title="History Point"
            rowData={items}
            headerData={headerData}
            loading={loading}
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
