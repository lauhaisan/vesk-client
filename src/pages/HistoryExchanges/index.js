import React, { Fragment } from "react";
import { Accordion, AccordionItem } from "carbon-components-react";
import { connect } from "react-redux";
import numeral from "numeral";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import FormAddExchange from "./component/FormAddExchange";
import Notification from "../../components/Notification";
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

  render() {
    const {
      loading,
      historyExchanges: { items = [] } = {},
      messageUpload,
      isCreateExchangeSuccessfully,
    } = this.props;

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
        header: "Coin",
        key: "coin",
      },
      {
        header: "Point",
        key: "point",
      },
      {
        header: "Contract",
        key: "contract",
      },
      {
        header: "Status",
        key: "status",
      },
    ];

    const formatData = items.map((item) => {
      const { date, money = 0 } = item;
      return {
        ...item,
        date,
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
              open={false}
              title={
                <div className="viewFilter__title">Create New Exchange</div>
              }
            >
              {/* <Filter resetFilter={this._resetFilter} search={this._search} /> */}
              <FormAddExchange />
            </AccordionItem>
          </Accordion>

          <TableCommon
            title="History Exchanges"
            rowData={formatData}
            headerData={headerData}
            loading={loading}
          />
        </div>
        {messageUpload === "Upload Image Failed" && (
          <Notification
            status="error"
            message={messageUpload}
            title="Upload Image Failed"
          />
        )}
        {isCreateExchangeSuccessfully && (
          <Notification
            status="success"
            title={"Create Exchange Successfully"}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  wallet: { loading, historyExchanges = {}, isCreateExchangeSuccessfully } = {},
  upload: { messageUpload } = {},
}) => ({
  loading,
  historyExchanges,
  messageUpload,
  isCreateExchangeSuccessfully,
});

const mapDispatchToProps = (dispatch) => ({
  getListHistory: (data) =>
    dispatch({ type: WALLET.GET_HISTORY_EXCHANGES, data: { data } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryExchanges);
