import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import Overview from "./Overview";
import { useEffect } from "react";

function Bundle(props) {
  const [bundleName, setBundleName] = React.useState("");

  const [isLoaded, setIsLoaded] = React.useState(false);

  const [bundle, setBundle] = React.useState(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(props.match.location.search);
    setBundleName(urlSearchParams.get("b"));

    if (props.mergedOutput !== null && bundleName !== "") {
      setBundle(
        props.mergedOutput.find((b) => b.name.localeCompare(bundleName) === 0)
      );
      setIsLoaded(true);
    }
  }, [props.mergedOutput, bundleName, props.match.location.search]);

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
