import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import Overview from "./Overview";

function Bundle(props) {
  const bundle = React.useMemo(() => {
    const urlSearchParams = new URLSearchParams(props.match.location.search);
    const bundleName = urlSearchParams.get("b");

    let bundle = null;
    if (props.mergedOutput !== null && bundleName !== "") {
      bundle = props.mergedOutput.find(
        (b) => b.name.localeCompare(bundleName) === 0
      );
    }

    return bundle;
  }, [props.match.location.search, props.mergedOutput]);

  if (bundle !== null) {
    return (
      <FlexGrid
        justifyContent={"center"}
        padding={"scale1000"}
        backgroundColor={["backgroundTertiary"]}
      >
        <FlexGridItem marginBottom={"scale1000"} maxWidth={"95%"}>
          <Overview bundle={bundle} />
        </FlexGridItem>
      </FlexGrid>
    );
  }
  return <div />;
}

export default Bundle;
