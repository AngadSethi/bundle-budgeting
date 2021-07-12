import * as React from "react";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import NumberCell from "./NumberCell";
import ButtonsCell from "./ButtonCell";
import BundleCell from "./BundleCell";
import { Pagination } from "baseui/pagination";
import { FlexGrid } from "baseui/flex-grid";

/**
 * The class encapsulating all cards displaying their individual bundles.
 */
class TableGroup extends React.Component {
  constructor(props) {
    super(props);

    this.PER_PAGE = 10;

    this.state = {
      currentPage: 1,
      isLoaded: false,
      sortColumn: "budget",
      sortAsc: false,
      isMerged: false,
    };
  }

  componentDidMount() {
    if (this.props.buildOutput !== null) {
      this.setState({
        result: this.props.buildOutput,
        isLoaded: true,
      });
    }

    if (this.props.mergedOutput !== null) {
      this.setState({
        isMerged: true,
        mergedOutput: this.props.mergedOutput,
      });
    }
  }

  rows() {
    const startIndex = (this.state.currentPage - 1) * this.PER_PAGE;
    const endIndex = this.state.currentPage * this.PER_PAGE;
    return this.state.result[this.state.result.length - 1].result.bundles
      .map((bundle) => bundle.data)
      .sort((a, b) => {
        const left = this.state.sortAsc ? a : b;
        const right = this.state.sortAsc ? b : a;

        switch (this.state.sortColumn) {
          case "name":
            return left.name.localeCompare(right.name);
          case "size":
            return left.size - right.size;
          case "budget":
            return left.percentage - right.percentage;
          default:
            return 0;
        }
      })
      .slice(startIndex, endIndex);
  }

  render() {
    if (this.state.isLoaded === true && this.state.isMerged === true) {
      const numPages = Math.ceil(
        this.state.mergedOutput.length / this.PER_PAGE
      );
      const cellStyle = ({ $theme }) => ({
        backgroundColor: $theme.colors.backgroundInversePrimary,
        color: $theme.colors.backgroundPrimary,
        ":hover": {
          backgroundColor: $theme.colors.backgroundPrimary,
          color: $theme.colors.backgroundInversePrimary,
        },
      });
      return (
        <div>
          <TableBuilder
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  maxHeight: "400px",
                  marginTop: $theme.sizing.scale2400,
                  borderRadius: $theme.borders.radius200,
                }),
              },
              TableHeadCellSortable: {
                style: cellStyle,
              },
              TableHeadCell: {
                style: cellStyle,
              },
            }}
            data={this.rows()}
            sortColumn={this.state.sortColumn}
            sortOrder={this.state.sortAsc ? "ASC" : "DESC"}
            onSort={(id) => {
              console.log(id);
              if (id === this.state.sortColumn) {
                this.setState({
                  sortAsc: !this.state.sortAsc,
                });
              } else {
                this.setState({
                  sortColumn: id,
                  sortAsc: !this.state.sortAsc,
                });
              }
            }}
          >
            <TableBuilderColumn header="Bundle" id="name" sortable>
              {(row) => <BundleCell title={row.name} subtitle={row.owner} />}
            </TableBuilderColumn>
            <TableBuilderColumn header="Size" id="size" sortable>
              {(row) => <NumberCell value={row.size} delta={row.percentage} />}
            </TableBuilderColumn>
            <TableBuilderColumn header="Budget" id="budget" sortable>
              {(row) => (
                <NumberCell value={row.budget} delta={row.percentage} />
              )}
            </TableBuilderColumn>
            <TableBuilderColumn header="Actions">
              {(row) => <ButtonsCell id={row.name} />}
            </TableBuilderColumn>
          </TableBuilder>
          <FlexGrid marginTop="scale1200" justifyContent="center">
            <Pagination
              numPages={numPages}
              currentPage={this.state.currentPage}
              onPageChange={({ nextPage }) => {
                this.setState({
                  currentPage: Math.min(Math.max(nextPage, 1), numPages),
                });
              }}
            />
          </FlexGrid>
        </div>
      );
    }
    return <div />;
  }
}

export default TableGroup;
