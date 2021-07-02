import { Card, StyledBody } from "baseui/card";
import * as React from "react";
import { colors } from "baseui/tokens";


function MyCard(props) {

  return (
    <Card
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            width: "328px",
            height: "200px",
            fontSize: "100px",
            backgroundColor: "white",
            borderWidth: "1px",
            borderRadius: "20px",
            borderStyle: "solid",
            borderColor: "hsla(0, 0%, 0%, 0.24)",

            ...props.overrides.Root.style,
          }),
          // ...props.overrides.Root,
        },
      }}
    >
      <StyledBody>{props.content}</StyledBody>
    </Card>
  );
}

export default MyCard;
