import * as React from "react";
import { Chart } from "react-charts";

const MBS_IN_A_KB = 0.001024;

export default function TotalSizeChart(props) {
  const data = React.useMemo(
    () => [
      {
        label: "Build Size",
        data: Object.entries(props.sizeHistory).map((build) => {console.log(typeof build[0]); return  {
          primary: new Date(parseInt(build[0])),
          secondary: build[1] * MBS_IN_A_KB,
        }}),
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
      { primary: true, position: "bottom", type: "time", show: true },
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
