import * as React from "react";
import { Block } from "baseui/block";

import BundleListWidget from "./BundleListWidget";
import TotalSizeWidget from "./TotalSizeWidget";
import NewBundlesWidget from "./NewBundlesWidget";


export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBundles: props.insights[0].text,
      totalSize: props.insights[1].text,
      bundlesAddedRemoved: props.insights[2].text,
      budgetListOpen: false,
      totalSizeOpen: false,
    };
    // console.log(props.insights);
  }


  render() {
    return (
      <Block display={"flex"} justifyContent={"space-around"} marginTop={"2%"}>
        <BundleListWidget numberOfBundles={this.state.numberOfBundles} />
        <TotalSizeWidget totalSize={this.state.totalSize} />
        <NewBundlesWidget bundlesAddedRemoved={this.state.bundlesAddedRemoved} />
      </Block>
    );
  }
}
