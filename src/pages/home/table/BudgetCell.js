import { useStyletron } from "baseui";
import { parseSize } from "../../../shared/util";
import { ProgressBar } from "baseui/progress-bar";

function NumberCell({ value, size, delta }) {
  const [css, theme] = useStyletron();
  const positive = delta >= 0;
  return (
    <div className={css({ display: "flex", alignItems: "center" })}>
      <ProgressBar
        value={Math.abs(size)}
        successValue={Math.abs(value)}
        overrides={{
          BarProgress: {
            style: ({ $theme }) => ({
              backgroundColor: positive
                ? $theme.colors.negative
                : $theme.colors.positive,
            }),
          },
        }}
        showLabel={true}
        getProgressLabel={(currentValue) => {
          return positive
            ? `Exceeded budget of ${parseSize(value)} by ${delta}%`
            : `Under budget of ${parseSize(value)} by ${Math.abs(delta)}%`;
        }}
      />
    </div>
  );
}

export default NumberCell;
