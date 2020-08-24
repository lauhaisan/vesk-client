import React, { Component, Fragment } from "react";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import "./index.scss";

class HistoryPoint extends Component {
  render() {
    // const {} = this.props;
    const { formatData = [], headerData = [], loading = false } = this.props;

    return (
      <Fragment>
        <div className="containerHistoryPoint">
          <TitlePage title="History Point" />
          <TableCommon
            // title="List User"
            rowData={formatData}
            headerData={headerData}
            loading={loading}
            actionReview={this._actionReview}
            actionEdit={this._actionEdit}
            actionDelete={this._actionDelete}
          />
        </div>
      </Fragment>
    );
  }
}

export default HistoryPoint;
