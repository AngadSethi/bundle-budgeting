import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import Overview from "./Overview";
import { useEffect } from "react";

function Bundle(props) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const bundleName = urlSearchParams.get("b");

  const [isLoaded, setIsLoaded] = React.useState(false);

  const [bundle, setBundle] = React.useState(null);

  useEffect(() => {
    if (props.mergedOutput !== null) {
      setBundle(
        props.mergedOutput.find((b) => b.name.localeCompare(bundleName))
      );
      setIsLoaded(true);
    }
  }, [props.mergedOutput, bundleName]);

  if (isLoaded === true) {
    return (
      <FlexGrid
        backgroundColor={["#DBDBDB"]}
        height={"100vh"}
        justifyContent={"center"}
      >
        <FlexGridItem marginTop={"scale1000"} maxWidth={"95%"}>
          <Overview bundle={bundle} />
        </FlexGridItem>
      </FlexGrid>
    );
  }
  return <div />;
}

export default Bundle;
