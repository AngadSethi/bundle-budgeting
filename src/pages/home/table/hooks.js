import { useMemo } from "react";

export function useSizeMap(mergedOutput) {
  return useMemo(() => {
    if (mergedOutput !== null) {
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

      return newSizeMap;
    }
    return null;
  }, [mergedOutput]);
}

export function useSortableRows(
  buildOutput,
  mergedOutput,
  sortAsc,
  sortColumn,
  startIndex,
  endIndex
) {
  return useMemo(() => {
    if (buildOutput !== null) {
      return buildOutput[buildOutput.length - 1].result.bundles
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
    return [];
  }, [buildOutput, endIndex, sortAsc, sortColumn, startIndex]);
}
