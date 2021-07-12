import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import Overview from "./Overview";

class BundleComponent extends React.Component {
  constructor(props) {
    super(props);

    const urlSearchParams = new URLSearchParams(window.location.search);

    this.state = {
      bundleName: urlSearchParams.get("b"),
      isLoaded: false,
    };
  }

  componentDidMount() {
    if (this.props.mergedOutput !== null) {
      this.setState({
        bundle: this.props.mergedOutput.find(
          (b) => b.name === this.state.bundleName
        ),
        isLoaded: true,
      });
    }
  }

  render() {
    if (this.state.isLoaded === true) {
      return (
        <FlexGrid
          backgroundColor={["#DBDBDB"]}
          height={"100vh"}
          justifyContent={"center"}
        >
          <FlexGridItem marginTop={"scale1000"} maxWidth={"95%"}>
            <Overview
              bundle={this.state.bundle}
              ownerDetails={this.state.ownerDetails}
            />
          </FlexGridItem>
        </FlexGrid>
      );
    }
    return <div />;
  }
}

export default BundleComponent;
