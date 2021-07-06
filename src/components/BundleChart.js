import * as React from "react";
import { Chart } from "react-charts";

export default function BundleChart(props) {
  const data = React.useMemo(
    () => [
      {
        label: "Asset Size",
        data: [
          { primary: "Build #1", secondary: 6.5 },
          { primary: "Build #2", secondary: 3.233 },
          { primary: "Build #3", secondary: 4.32 },
          { primary: "Build #4", secondary: 4.2 },
          { primary: "Build #5", secondary: 5.3 },
          { primary: "Build #6", secondary: 8.5 },
        ],
      },
    ],
    []
  );

  const getSeriesStyle = React.useCallback(
    () => ({
      color: `url(#${props.overshot ? 0 : 1})`,
    }),
    [props.overshot]
  );

  const series = React.useMemo(
    () => ({
      type: "area",
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "ordinal", show: true },
      { position: "left", type: "linear", stacked: true, show: true },
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
