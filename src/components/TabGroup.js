import * as React from "react";
import { Tab, Tabs, FILL } from "baseui/tabs-motion";
import BundleTable from "./BundleTableComponent";
import { Block } from "baseui/block";

class TabGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: "0",
    };
  }

  renderTabs() {
    const tabs = [];

    for (const tab of this.props.tabs) {
      tabs.push(
        <Tab title={tab.title}>
          <BundleTable fileType={tab.extension} />
        </Tab>
      );
    }

    return tabs;
  }

  render() {
    return (
      <Block marginTop={"3em"}>
        <Tabs
          activeKey={this.state.activeKey}
          onChange={({ activeKey }) => {
            this.setState({
              activeKey: activeKey,
            });
          }}
          activateOnFocus
          fill={FILL.fixed}
        >
          {this.renderTabs()}
        </Tabs>
      </Block>
    );
  }
}

export default TabGroup;
