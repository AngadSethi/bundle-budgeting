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

/**
 * Calculate the extent of bundle violation
 *
 * @param {Number} size
 * @param {Number} budget
 * @returns {number}
 */
const percentage = ({ size, budget }) => {
  if (size < budget) {
    return Math.round(((size - budget) / size) * 100);
  }
  return Math.round(((size - budget) / budget) * 100);
};

export function useSortableRows(
  mergedOutput,
  sortAsc,
  sortColumn,
  startIndex,
  endIndex
) {
  return useMemo(() => {
    if (mergedOutput !== null) {
      console.log(mergedOutput);
      return mergedOutput
        .sort((a, b) => {
          const left = sortAsc ? a : b;
          const right = sortAsc ? b : a;

          left.percentage = percentage(left);
          right.percentage = percentage(right);

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
  }, [endIndex, mergedOutput, sortAsc, sortColumn, startIndex]);
}
