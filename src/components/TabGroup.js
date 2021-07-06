import * as React from "react";
import { Tab, Tabs, FILL } from "baseui/tabs-motion";
import { Block } from "baseui/block";
import CardGroup from "./BundleCardGroup";

class TabGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: "0",
    };
  }

  renderTabs() {
    const tabs = [];
    let key = 0;

    for (const tab of this.props.tabs) {
      tabs.push(
        <Tab title={tab.title} key={key}>
          <CardGroup
            fileType={tab.extension}
            buildOutput={this.props.buildOutput}
          />
        </Tab>
      );
      key += 1;
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
          overrides={{
            TabHighlight: {
              style: ({ $theme }) => ({
                backgroundColor: $theme.colors.accent,
              }),
            },
          }}
        >
          {this.renderTabs()}
        </Tabs>
      </Block>
    );
  }
}

export default TabGroup;
