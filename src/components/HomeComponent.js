import * as React from "react";
import { Block } from "baseui/block";
import Widget from "./WidgetsGroup/Widgets";
import widgetdata from "../shared/widgetdata";
import Table from "./Table/index";

function Home(props) {
  return (
    <Block backgroundColor={["backgroundTertiary"]} height={"100vh"}>
      <Block margin={"auto"} padding={"10em"} paddingTop={"2em"}>
        <Widget
          insights={widgetdata}
          buildOutput={props.buildOutput}
          mergedOutput={props.mergedOutput}
          sizeHistory={props.sizeHistory}
        />
        <Block marginTop={"3em"}>
          <Table
            buildOutput={props.buildOutput}
            mergedOutput={props.mergedOutput}
          />
        </Block>
      </Block>
    </Block>
  );
}

export default Home;
