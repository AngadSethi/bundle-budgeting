import * as React from "react";
import { Block } from "baseui/block";
import Widget from "./WidgetsGroup/Widgets";
import widgetdata from "../shared/widgetdata";
import Table from "./Table/index";

class HomeComponent extends React.Component {
  render() {
    return (
      <Block backgroundColor={["backgroundTertiary"]} height={"100vh"}>
        <Block margin={"auto"} padding={"10em"} paddingTop={"2em"}>
          <Widget
            insights={widgetdata}
            buildOutput={this.props.buildOutput}
            mergedOutput={this.props.mergedOutput}
            sizeHistory={this.props.sizeHistory}
          />
          <Block marginTop={"3em"}>
            <Table
              buildOutput={this.props.buildOutput}
              mergedOutput={this.props.mergedOutput}
            />
          </Block>
        </Block>
      </Block>
    );
  }
}

export default HomeComponent;
