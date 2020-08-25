import React, { Fragment } from "react";
import { Accordion, AccordionItem } from "carbon-components-react";
import { connect } from "react-redux";
import TitlePage from "../../components/TitlePage";
import TableCommon from "../../components/TableCommon";
import Filter from "./component/Filter";
// import moment from "moment";
// import { LIST_USER } from "../../constant";
import "./index.scss";

class HistoryPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  _resetFilter = () => {
    console.log("reset filter");
  };

  _search = value => {
    console.log("value search", value);
  };

  render() {
    const { loading, listUserData = [] } = this.props;

    const headerData = [
      {
        header: "Email",
        key: "email"
      },
      {
        header: "First Name",
        key: "firstName"
      },
      {
        header: "Last Name",
        key: "lastName"
      },
      {
        header: "User Name",
        key: "userName"
      }
    ];

    const formatData = listUserData.map(item => {
      return {
        ...item,
        id: item.userId
      };
    });

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
            rowData={formatData}
            headerData={headerData}
            loading={loading}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ listUser: { loading, listUserData } = {} }) => ({
  loading,
  listUserData
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPoint);
