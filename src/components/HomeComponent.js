import * as React from "react";
import { Block } from "baseui/block";
import Widget from "./WidgetsGroup/Widgets";
import widgetdata from "../shared/widgetdata";
import TabGroup from "./TabGroup";
import tabs from "../shared/tabData";

class HomeComponent extends React.Component {
  render() {
    return (
      <Block backgroundColor={["#DBDBDB"]} height={"100vh"}>
        <Block
          margin={"auto"}
          paddingLeft={"3em"}
          paddingRight={"3em"}
          paddingTop={"2em"}
        >
          <Widget insights={widgetdata} />
          <TabGroup tabs={tabs} />
        </Block>
      </Block>
    );
  }
}

export default HomeComponent;
