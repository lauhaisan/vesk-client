import React, { Fragment } from "react";
import "./index.scss";
import { DataTable, PaginationNav } from "carbon-components-react";
import Spin from "../Spin";
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

class TableCommon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }

  onChangePage = (value) => {
    // const function pagination from prop:
    // ex: const { handlePagination} = this.props
    this.setState({
      currentPage: value,
    });
    // Dispatch to handlePagination with param: value +1 because default value = 0
  };

  renderAction = (item) => {
    const { actionReview, actionEdit, actionDelete } = this.props;
    return (
      <div className="viewAction">
        <i
          className="fas fa-eye viewAction__icon viewAction__icon--review"
          onClick={() => actionReview(item)}
        ></i>
        <i
          className="fas fa-edit viewAction__icon viewAction__icon--edit"
          onClick={() => actionEdit(item)}
        ></i>
        <i
          className="fas fa-trash-alt viewAction__icon viewAction__icon--delete"
          onClick={() => actionDelete(item)}
        ></i>
      </div>
    );
  };

  renderValue = (nameHeader, value) => {
    return nameHeader === "contract" && value ? (
      <a target="_blank" rel="noopener noreferrer" href={value}>
        View Contract
      </a>
    ) : (
      value
    );
  };

  renderTableRow = (rows) => {
    return rows.map((row) => (
      <TableRow key={row.id}>
        {row.cells.map((cell) => {
          const { id = "", info: { header = "" } = {}, value = "" } = cell;
          return (
            <TableCell key={id}>
              {header === "action"
                ? this.renderAction(row)
                : this.renderValue(header, value)}
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  render() {
    const {
      rowData = [],
      headerData = [],
      title,
      total = 0,
      limit = 10,
      loading = false,
    } = this.props;
    const { currentPage } = this.state;
    const totalPage = Math.ceil(total / limit);

    return (
      <div className="tableCommon">
        <DataTable
          rows={rowData}
          headers={headerData}
          render={({ rows, headers, getHeaderProps }) => (
            <TableContainer title={title}>
              {loading ? (
                <div className="viewLoading">
                  <Spin />
                </div>
              ) : (
                <Fragment>
                  {rows.length === 0 ? (
                    <div className="viewEmpty">
                      <img
                        className="viewEmpty__img"
                        src={require("../../images/empty.png")}
                        alt="img-empty"
                      />
                      <p className="viewEmpty__text">No Result</p>
                    </div>
                  ) : (
                    <Table useZebraStyles>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>{this.renderTableRow(rows)}</TableBody>
                    </Table>
                  )}
                </Fragment>
              )}
            </TableContainer>
          )}
        />
        {totalPage > 1 && (
          <PaginationNav
            className=""
            itemsShown={5}
            page={currentPage}
            onChange={(page) => this.onChangePage(page)}
            totalItems={totalPage}
          />
        )}
      </div>
    );
  }
}
export default TableCommon;
