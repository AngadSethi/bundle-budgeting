import * as React from "react";
import { Block } from "baseui/block";
import TableGroup from "./BundleTableGroup";

class TabGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: "0",
    };
  }

  render() {
    return (
      <Block marginTop={"3em"}>
        <TableGroup
          buildOutput={this.props.buildOutput}
          mergedOutput={this.props.mergedOutput}
        />
      </Block>
    );
  }
}

export default TabGroup;
