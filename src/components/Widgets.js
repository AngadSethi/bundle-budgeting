import * as React from "react";
import { Block } from "baseui/block";
import { BUNDLE_BUDGETS_URL, BUNDLE_STATS_URL } from "../shared/endPoints";

import MyCard from "./MyCard";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBundles: props.insights[0].text,
      totalSize: props.insights[1].text,
      bundlesAddedRemoved: props.insights[2].text,
      isOpen: false,
    };
    this.close = this.close.bind(this)
    // console.log(props.insights);
  }
  componentDidMount() {
    fetch(BUNDLE_BUDGETS_URL)
      .then((result) => result.json())
      .then((budgets) => {
        console.log(budgets)
      })
  }

  close() {
    this.setState({ isOpen: false })
  }
  render() {
    return (
      <Block display={"flex"} justifyContent={"space-around"} marginTop={"2%"}>
        <div onClick={() => this.setState({ isOpen: true })}>
          <MyCard
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  backgroundColor: $theme.colors.positive300,
                }),
              }
            }}
            content={this.state.numberOfBundles}
          />
        </div>
        <Modal onClose={this.close} isOpen={this.state.isOpen}>
          <ModalHeader>Bundles that exceeded the Budget</ModalHeader>
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <ModalButton onClick={this.close}>Okay</ModalButton>
          </ModalFooter>
        </Modal>

        <MyCard
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                backgroundColor: $theme.colors.warning200,
              }),
            }
          }}
          content={this.state.totalSize}
        />

        <MyCard
          overrides={{
            Root: {
              style: ({ $theme }) => ({
                backgroundColor: $theme.colors.accent300,
              }),
            }
          }}
          content={this.state.bundlesAddedRemoved}
        />
      </Block>
    );
  }
}
