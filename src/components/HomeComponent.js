import * as React from "react";
import { Block } from "baseui/block";
import Table from "./Table/index";
import BundleListWidget from "./WidgetsGroup/BundleListWidget";
import TotalSizeWidget from "./WidgetsGroup/TotalSizeWidget";
import NewBundlesWidget from "./WidgetsGroup/NewBundlesWidget";
function Home(props) {
  return (
    <Block backgroundColor={["backgroundTertiary"]} height={"100vh"}>
      <Block margin={"auto"} padding={"10em"} paddingTop={"2em"}>
        <Block display={"flex"} justifyContent={"space-around"} marginTop={"2%"}>
          <BundleListWidget buildOutput={props.buildOutput} />
          <TotalSizeWidget
            buildOutput={props.buildOutput}
            sizeHistory={props.sizeHistory}
          />
          <NewBundlesWidget mergedOutput={props.mergedOutput} />
        </Block>
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
