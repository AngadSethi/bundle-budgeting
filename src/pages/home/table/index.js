import * as React from "react";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import NumberCell from "./NumberCell";
import BundleCell from "./BundleCell";
import { Pagination } from "baseui/pagination";
import { FlexGrid } from "baseui/flex-grid";
import { useEffect } from "react";

function Table(props) {
  const ENTRIES_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = React.useState(1);

  const [isLoaded, setIsLoaded] = React.useState(false);

  const [sortColumn, setSortColumn] = React.useState("budget");

  const [sortAsc, setSortAsc] = React.useState(false);

  const [isMerged, setIsMerged] = React.useState(false);

  const [sizeMap, setSizeMap] = React.useState(null);

  const [result, setResult] = React.useState(props.buildOutput);

  const [mergedOutput, setMergedOutput] = React.useState(props.mergedOutput);

  useEffect(() => {
    if (props.buildOutput !== null) {
      setIsLoaded(true);
      setResult(props.buildOutput);
    }

    if (props.mergedOutput !== null) {
      setIsMerged(true);
      setMergedOutput(props.mergedOutput);
    }

    if (isLoaded === true && isMerged === true) {
      const newSizeMap = new Map();

      mergedOutput.forEach((value) => {
        const len = value.sizes.length;
        newSizeMap.set(
          value.name,
          len > 1
            ? Math.round(
                ((value.sizes[len - 1][1] - value.sizes[len - 2][1]) /
                  value.sizes[len - 2][1]) *
                  100
              )
            : 0
        );
      });

      setSizeMap(newSizeMap);
    }
  }, [props.buildOutput, props.mergedOutput, isLoaded, isMerged, mergedOutput]);

  const allLoaded = isLoaded && isMerged;

  const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
  const endIndex = currentPage * ENTRIES_PER_PAGE;
  let rows = [];
  if (allLoaded === true) {
    rows = result[result.length - 1].result.bundles
      .map((bundle) => bundle.data)
      .sort((a, b) => {
        const left = sortAsc ? a : b;
        const right = sortAsc ? b : a;

        switch (sortColumn) {
          case "name":
            return left.name.localeCompare(right.name);
          case "owner":
            return left.owner.localeCompare(right.owner);
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

  const numPages = allLoaded
    ? Math.ceil(mergedOutput.length / ENTRIES_PER_PAGE)
    : 0;
  const cellStyle = ({ $theme }) => ({
    backgroundColor: $theme.colors.backgroundInversePrimary,
    color: $theme.colors.backgroundPrimary,
    ":hover": {
      backgroundColor: $theme.colors.backgroundPrimary,
      color: $theme.colors.backgroundInversePrimary,
    },
  });
  const overrides = {
    Root: {
      style: ({ $theme }) => ({
        maxHeight: "400px",
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
        isLoading={!allLoaded}
        data={rows}
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
          {(row) => (
            <NumberCell
              value={row.size}
              delta={sizeMap !== null ? sizeMap.get(row.name) : 0}
            />
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Budget" id="budget" sortable>
          {(row) => <NumberCell value={row.budget} delta={row.percentage} />}
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
