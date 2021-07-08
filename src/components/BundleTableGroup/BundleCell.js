import { useStyletron } from "baseui";

function BundleCell({ title, subtitle }) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({ display: "flex", alignItems: "center" })}>
      <div
        className={css({
          paddingLeft: theme.sizing.scale550,
          whiteSpace: "nowrap",
        })}
      >
        <p
          className={css({
            ...theme.typography.LabelSmall,
            margin: 0,
          })}
        >
          {title}
        </p>
        <p
          className={css({
            ...theme.typography.ParagraphSmall,
            marginBottom: 0,
            marginTop: "4px",
          })}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default BundleCell;
