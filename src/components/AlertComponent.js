import * as React from "react";
import { Notification } from "baseui/notification";
import { Block } from "baseui/block";
import { ArrowLeft, ArrowRight } from "baseui/icon";
import { Button, SHAPE, KIND } from "baseui/button";

function AlertComponent(props) {
  const [currentAlert, setCurrentAlert] = React.useState(0);
  const alert = props.alerts[currentAlert];
  return (
    <Block display={"flex"} alignItems={"center"}>
      <Button
        shape={SHAPE.circle}
        kind={KIND.secondary}
        disabled={currentAlert === 0}
        onClick={() => {
          setCurrentAlert(currentAlert - 1);
        }}
      >
        <ArrowLeft />
      </Button>
      <Notification
        kind={alert.kind}
        overrides={{
          Body: {
            style: {
              width: "auto",
              flex: "auto",
              marginLeft: "1em",
              marginRight: "1em",
            },
          },
        }}
      >
        {alert.text}
      </Notification>
      <Button
        shape={SHAPE.circle}
        kind={KIND.secondary}
        disabled={currentAlert === props.alerts.length - 1}
        onClick={() => {
          setCurrentAlert(currentAlert + 1);
        }}
      >
        <ArrowRight />
      </Button>
    </Block>
  );
}

export default AlertComponent;
