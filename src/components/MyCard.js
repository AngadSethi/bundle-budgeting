import { Card, StyledBody } from "baseui/card";
import * as React from "react";

function MyCard(props) {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            width: "328px",
            height: "200px",
            backgroundColor: "pink",
            ...props.overrides.Root.style,
          },
          ...props.overrides.Root,
        },
      }}
    >
      <StyledBody>{props.content}</StyledBody>
    </Card>
  );
}

export default MyCard;
