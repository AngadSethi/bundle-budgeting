import { useStyletron } from "baseui";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { Show } from "baseui/icon";

function ButtonsCell({ id }) {
  const [css] = useStyletron();
  return (
    <div className={css({ display: "flex", alignItems: "center" })}>
      <Button
        $as="a"
        href={"bundle?b=" + encodeURI(id)}
        kind={KIND.primary}
        size={SIZE.compact}
        shape={SHAPE.circle}
        key={id}
        title="View More Details"
      >
        <Show />
      </Button>
    </div>
  );
}

export default ButtonsCell;
