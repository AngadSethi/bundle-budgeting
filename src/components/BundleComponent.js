import * as React from "react";

class BundleComponent extends React.Component {
  constructor(props) {
    super(props);

    const urlSearchParams = new URLSearchParams(window.location.search);

    this.state = {
      bundleName: urlSearchParams.get("b"),
    };
  }

  render() {
    return <div />;
  }
}

export default BundleComponent;
