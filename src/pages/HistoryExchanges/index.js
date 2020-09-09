import React, { Fragment } from "react";
import { Accordion, AccordionItem } from "carbon-components-react";
import { connect } from "react-redux";
import numeral from "numeral";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import Filter from "./component/Filter";
import { WALLET } from "../../constant";
import { getToken } from "../../utils/token";
import { Redirect } from "react-router-dom";
import "./index.scss";

class HistoryExchanges extends React.Component {
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
    const { loading, historyExchanges: { items = [] } = {} } = this.props;

    const headerData = [
      {
        header: "Created",
        key: "date",
      },
      {
        header: "Message",
        key: "message",
      },
      {
        header: "Money",
        key: "money",
      },
    ];

    const formatData = items.map((item) => {
      const { date, money = 0 } = item;
      return {
        ...item,
        date,
        // createdAt: moment(createdAt).format("DD MMM YYYY hh:mm a"),
        money: money && numeral(money).format("0,0"),
      };
    });

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
            title="History Exchanges"
            rowData={formatData}
            headerData={headerData}
            loading={loading}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  wallet: { loading, historyExchanges = {} } = {},
}) => ({
  loading,
  historyExchanges,
});

const mapDispatchToProps = (dispatch) => ({
  getListHistory: (data) =>
    dispatch({ type: WALLET.GET_HISTORY_EXCHANGES, data: { data } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryExchanges);
