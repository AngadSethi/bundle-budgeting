import { Component } from "react";
import { BUNDLE_STATS_URL } from "../shared/endPoints";
import buildOutput from "../parseBuildOutput";

class BundleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch(BUNDLE_STATS_URL)
      .then((result) => result.json())
      .then((buildStats) => {
        console.log(buildOutput(buildStats));
        this.setState({
          ...this.state,
          isLoaded: true,
          buildStats: buildStats,
          parsedBuildStats: buildOutput(buildStats),
        });
      });
  }

  render() {
    return <div></div>;
  }
}

export default BundleTable;
