import { useStyletron } from "baseui";
import { ArrowDown, ArrowUp } from "baseui/icon";

function NumberCell({ value, delta }) {
  const [css, theme] = useStyletron();
  const positive = delta >= 0;
  return (
    <div className={css({ display: "flex", alignItems: "center" })}>
      <span className={css({ ...theme.typography.MonoParagraphSmall })}>
        {value.toLocaleString()} KiB
      </span>
      <div
        className={css({
          alignItems: "center",
          display: "flex",
          paddingLeft: theme.sizing.scale300,
          color: positive
            ? theme.colors.contentNegative
            : theme.colors.contentPositive,
        })}
      >
        {positive ? <ArrowUp /> : <ArrowDown />}
        <span
          className={css({
            ...theme.typography.MonoLabelSmall,
            paddingLeft: "2px",
          })}
        >
          {delta}%
        </span>
      </div>
    </div>
  );
}

export default NumberCell;
