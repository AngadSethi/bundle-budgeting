import * as React from "react";
import { Block } from "baseui/block";
import returnResult from "./ProcessBudgets";
import BundleChart from "./BundleChart";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { ListItem, ListItemLabel } from "baseui/list";

import MyCard from "./MyCard";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";

export default class Widget extends React.Component {
  constructor(props) {
    console.log(returnResult());
    super(props);
    this.state = {
      numberOfBundles: props.insights[0].text,
      totalSize: props.insights[1].text,
      bundlesAddedRemoved: props.insights[2].text,
      budgetListOpen: false,
      totalSizeOpen: false,
    };
    this.budgetListclose = this.budgetListclose.bind(this);
    this.totalSizeModalClose = this.totalSizeModalClose.bind(this);
    // console.log(props.insights);
  }

  budgetListclose() {
    this.setState({ budgetListOpen: false });
  }

  totalSizeModalClose() {
    this.setState({ totalSizeOpen: false });
  }

  render() {
    return (
      <Block display={"flex"} justifyContent={"space-around"} marginTop={"2%"}>
        <div onDoubleClick={() => this.setState({ budgetListOpen: true })}>
          <MyCard
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  backgroundColor: $theme.colors.positive300,
                }),
              },
            }}
            content={this.state.numberOfBundles}
          />
        </div>

        <Modal
          onClose={this.budgetListclose}
          isOpen={this.state.budgetListOpen}
        >
          <ModalHeader>Bundles that exceeded the Budget</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <ModalButton onClick={this.budgetListclose}>Okay</ModalButton>
          </ModalFooter>
        </Modal>

        <div onDoubleClick={() => this.setState({ totalSizeOpen: true })}>
          <MyCard
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  backgroundColor: $theme.colors.warning200,
                }),
              },
            }}
            content={this.state.totalSize}
          />
        </div>

        <Modal
          onClose={this.totalSizeModalClose}
          isOpen={this.state.totalSizeOpen}
        >
          <ModalHeader>Bundles that exceeded the Budget</ModalHeader>
          <ModalBody>
            <FlexGrid
              flexGridColumnCount={[1, 2]}
              flexGridColumnGap="scale800"
              flexGridRowGap="scale800"
            >
              <FlexGridItem maxWidth={"scale2400"}>
                <ul
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  <ListItem>
                    <ListItemLabel>Total Size</ListItemLabel>
                  </ListItem>
                  <ListItem>
                    <ListItemLabel>Total Budget</ListItemLabel>
                  </ListItem>
                </ul>
              </FlexGridItem>
              <FlexGridItem>
                <BundleChart
                  name={"Project Name"}
                  // overshot={bundle.data.overshot}
                />
              </FlexGridItem>
            </FlexGrid>
          </ModalBody>
          <ModalFooter>
            <ModalButton onClick={this.totalSizeModalClose}>Okay</ModalButton>
          </ModalFooter>
        </Modal>

        <MyCard
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                backgroundColor: $theme.colors.accent300,
              }),
            },
          }}
          content={this.state.bundlesAddedRemoved}
        />
      </Block>
    );
  }
}
