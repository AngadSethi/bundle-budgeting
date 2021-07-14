import { useStyletron } from "baseui";
import { generateBundleUrl } from "../../shared/util";
import { StyledLink } from "baseui/link";

function BundleCell(props) {
  const [css, theme] = useStyletron();

  if (props.link) {
    return (
      <div className={css({ display: "flex", alignItems: "center" })}>
        <div
          className={css({
            paddingLeft: theme.sizing.scale550,
            whiteSpace: "nowrap",
          })}
        >
          <StyledLink href={generateBundleUrl(props.title)}>
            <p
              className={css({
                ...theme.typography.LabelMedium,
                margin: 0,
              })}
            >
              {props.title}
            </p>
          </StyledLink>
        </div>
      </div>
    );
  }

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
            ...theme.typography.LabelMedium,
            margin: 0,
          })}
        >
          {props.title}
        </p>
      </div>
    </div>
  );
}

export default BundleCell;
