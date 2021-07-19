import * as React from "react";
import { Chart } from "react-charts";
import { parseSize } from "../../shared/util";

const MBS_IN_A_KB = 0.001024;

export default function BundleChart(props) {
  const data = React.useMemo(
    () => [
      {
        label: "Asset Size",
        data: props.bundle.sizes.map((value) => ({
          primary: new Date(value[0]),
          secondary: value[1] * MBS_IN_A_KB,
        })),
      },
    ],
    [props.bundle.sizes]
  );

  const getSeriesStyle = React.useCallback(
    () => ({
      color: `url(#${props.bundle.size < props.bundle.budget ? 0 : 1})`,
    }),
    [props.bundle]
  );

  const series = React.useMemo(
    () => ({
      type: "area",
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "time", show: true },
      { position: "left", type: "linear", stacked: true },
    ],
    []
  );

  return (
    <Chart
      data={data}
      axes={axes}
      series={series}
      getSeriesStyle={getSeriesStyle}
      tooltip
      renderSVG={() => (
        <defs>
          <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#00BAE9" />
            <stop offset="100%" stopColor="#118ACB" />
          </linearGradient>
          <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#F38181" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>
      )}
    />
  );
}
