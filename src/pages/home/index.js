import * as React from "react";
import { Block } from "baseui/block";
import Table from "./table";
import BundleListWidget from "./widgets/BundleListWidget";
import TotalSizeWidget from "./widgets/TotalSizeWidget";
import NewBundlesWidget from "./widgets/NewBundlesWidget";
function Home(props) {
  return (
    <Block backgroundColor={["backgroundTertiary"]}>
      <Block margin={"auto"} padding={"10em"} paddingTop={"2em"}>
        <Block
          display={"flex"}
          justifyContent={"space-around"}
          marginTop={"2%"}
        >
          <BundleListWidget mergedOutput={props.mergedOutput} />
          <TotalSizeWidget
            buildOutput={props.buildOutput}
            sizeHistory={props.sizeHistory}
            mergedOutput={props.mergedOutput}
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
