import * as React from "react";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import SizeCell from "./SizeCell";
import BundleCell from "./BundleCell";
import { Pagination } from "baseui/pagination";
import { FlexGrid } from "baseui/flex-grid";
import { useSizeMap, useSortableRows } from "./hooks";
import BudgetCell from "./BudgetCell";

const ENTRIES_PER_PAGE = 10;

function Table(props) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const [sortColumn, setSortColumn] = React.useState("budget");
  const [sortAsc, setSortAsc] = React.useState(false);

  const sizeMap = useSizeMap(props.mergedOutput);

  const numPages =
    props.mergedOutput !== null && props.buildOutput !== null
      ? Math.ceil(props.mergedOutput.length / ENTRIES_PER_PAGE)
      : 0;
  const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
  const endIndex = currentPage * ENTRIES_PER_PAGE;

  const cellStyle = ({ $theme }) => ({
    backgroundColor: $theme.colors.backgroundInversePrimary,
    color: $theme.colors.backgroundPrimary,
    ":hover": {
      backgroundColor: $theme.colors.backgroundInversePrimary,
      color: $theme.colors.backgroundPrimary,
    },
  });

  const overrides = {
    Root: {
      style: ({ $theme }) => ({
        marginTop: $theme.sizing.scale2400,
        borderRadius: $theme.borders.radius200,
      }),
    },
    TableBodyRow: {
      style: ({ $theme, $rowIndex }) => ({
        backgroundColor:
          $rowIndex % 2
            ? $theme.colors.backgroundPrimary
            : $theme.colors.backgroundSecondary,
        ":hover": {
          backgroundColor: $theme.colors.backgroundTertiary,
        },
      }),
    },
    TableHeadCellSortable: {
      style: cellStyle,
    },
    TableHeadCell: {
      style: cellStyle,
    },
  };

  return (
    <div>
      <TableBuilder
        overrides={overrides}
        isLoading={props.mergedOutput === null || props.buildOutput === null}
        data={useSortableRows(
          props.buildOutput,
          props.mergedOutput,
          sortAsc,
          sortColumn,
          startIndex,
          endIndex
        )}
        sortColumn={sortColumn}
        sortOrder={sortAsc ? "ASC" : "DESC"}
        onSort={(id) => {
          if (id === sortColumn) {
            setSortAsc(!sortAsc);
          } else {
            setSortColumn(id);
            setSortAsc(!sortAsc);
          }
        }}
      >
        <TableBuilderColumn header="Bundle" id="name" sortable>
          {(row) => <BundleCell link title={row.name} />}
        </TableBuilderColumn>

        <TableBuilderColumn header="Owner" id="owner" sortable>
          {(row) => <BundleCell title={row.owner} />}
        </TableBuilderColumn>

        <TableBuilderColumn header="Size" id="size" sortable>
          {(row) => <SizeCell value={row.size} delta={sizeMap.get(row.name)} />}
        </TableBuilderColumn>

        <TableBuilderColumn header="Budget" id="budget" sortable>
          {(row) => (
            <BudgetCell
              value={row.budget}
              delta={row.percentage}
              size={row.size}
            />
          )}
        </TableBuilderColumn>
      </TableBuilder>

      <FlexGrid marginTop="scale1200" justifyContent="center">
        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          onPageChange={({ nextPage }) => {
            setCurrentPage(Math.min(Math.max(nextPage, 1), numPages));
          }}
        />
      </FlexGrid>
    </div>
  );
}

export default Table;
