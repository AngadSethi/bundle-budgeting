import * as React from "react";
import { Block } from "baseui/block";

import BundleListWidget from "./BundleListWidget";
import TotalSizeWidget from "./TotalSizeWidget";
import NewBundlesWidget from "./NewBundlesWidget";

export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetListOpen: false,
      totalSizeOpen: false,
    };
  }

  render() {
    return (
      <Block display={"flex"} justifyContent={"space-around"} marginTop={"2%"}>
        <BundleListWidget buildOutput={this.props.buildOutput} />
        <TotalSizeWidget
          buildOutput={this.props.buildOutput}
          sizeHistory={this.props.sizeHistory}
        />
        <NewBundlesWidget mergedOutput={this.props.mergedOutput} />
      </Block>
    );
  }
}
