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
              style: ({ $theme }) => ({
                backgroundColor: $theme.colors.positive300,
              }),
            }
          }}
          content={this.state.numberOfBundles}

        />

        <MyCard
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                backgroundColor: $theme.colors.warning200,
              }),
            }
          }}
          content={this.state.totalSize}
        />

        <MyCard
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                backgroundColor: $theme.colors.accent300,
              }),
            }
          }}
          content={this.state.bundlesAddedRemoved}
        />
      </Block>
    );
  }
}
