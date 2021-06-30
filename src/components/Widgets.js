import * as React from "react";
import { Card, StyledBody } from "baseui/card";
import { Block } from "baseui/block";
import MyCard from "./MyCard";

export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBundles: props.insights[0].text,
      totalSize: props.insights[1].text,
      bundlesAddedRemoved: props.insights[2].text,
    };
    console.log(props.insights);
  }

  render() {
    return (
      <Block display={"flex"} justifyContent={"space-around"} marginTop={"2%"}>
        <MyCard
          overrides={{
            Root: {
              style: {
                backgroundColor: "pink",
              },
            },
          }}
          content={this.state.numberOfBundles}
        />

        <MyCard
          overrides={{
            Root: {
              style: {
                backgroundColor: "orange",
              },
            },
          }}
          content={this.state.totalSize}
        />

        <Card
          overrides={{
            Root: {
              style: {
                width: "328px",
                height: "200px",
                backgroundColor: "yellow",
              },
            },
          }}
        >
          <StyledBody>{this.state.bundlesAddedRemoved}</StyledBody>
        </Card>
      </Block>
    );
  }
}
