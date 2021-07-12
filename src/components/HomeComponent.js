import * as React from "react";
import { Block } from "baseui/block";
import Widget from "./WidgetsGroup/Widgets";
import widgetdata from "../shared/widgetdata";
import TabGroup from "./TabGroup";
import tabs from "../shared/tabData";

class HomeComponent extends React.Component {
  render() {
    return (
      <Block backgroundColor={["backgroundTertiary"]} height={"100vh"}>
        <Block margin={"auto"} padding={"10em"} paddingTop={"2em"}>
          <Widget insights={widgetdata} buildOutput={this.props.buildOutput} />
          <TabGroup
            tabs={tabs}
            buildOutput={this.props.buildOutput}
            mergedOutput={this.props.mergedOutput}
          />
        </Block>
      </Block>
    );
  }
}

export default HomeComponent;
