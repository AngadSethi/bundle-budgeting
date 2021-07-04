import { Card, StyledBody } from "baseui/card";
import * as React from "react";
import { withStyle } from "baseui";

function MyCard(props) {
  const CustomBody = withStyle(StyledBody, ({ $theme }) => ({
    fontSize: $theme.typography.font550.fontSize,
    fontFamily: $theme.typography.font550.fontFamily,
    fontWeight: $theme.typography.font550.fontWeight,
    marginTop: "25%",
    textAlign: "center"
  }));

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
      <CustomBody>{props.content}</CustomBody>
    </Card>
  );
}

export default MyCard;
