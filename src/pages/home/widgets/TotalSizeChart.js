import * as React from "react";
import { Chart } from "react-charts";

export default function TotalSizeChart(props) {
  const data = React.useMemo(
    () => [
      {
        label: "Build Size",
        data: props.sizeHistory.map((value) => ({
          primary: new Date(value[0]),
          secondary: value[1],
        })),
      },
    ],
    [props.sizeHistory]
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
    <div
      style={{
        height: "200px",
        width: "100%",
      }}
    >
      <Chart
        data={data}
        axes={axes}
        series={series}
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
    </div>
  );
}
