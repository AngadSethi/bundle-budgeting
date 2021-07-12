import * as React from "react";
import { Component } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import { StyledLink } from "baseui/link";

import MyCard from "../MyCard";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";


export default class NewBundlesWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bundlesAdded: 0,
      newBundleList: null,
      newbundlesListOpen: false,
      error: false,
      isNewBundlesLoaded: false,
    }
    this.newBundlesListclose = this.newBundlesListclose.bind(this);
  }

  componentDidMount() {
    if (this.props.mergedOutput != null) {
      let newBundles = 0;
      let newBundleNames = [];
      for (let bundle of this.props.mergedOutput) {
        if (bundle["sizes"].length === 1) {
          newBundles = newBundles + 1;
          newBundleNames.push(bundle["name"]);
        }
      }

      this.setState({ bundlesAdded: newBundles, newBundleList: newBundleNames, isNewBundlesLoaded: true })
    }
  }

  renderList() {
    if (this.state.error) {
      return <div>Error Loading Data</div>;
    }
    if (!this.state.isNewBundlesLoaded) {
      return <div>Data Still Loading ....</div>;
    }
    else if (this.state.newBundleList.length === 0) {
      return <div> No new Bundles have been added in the last build</div>
    }
    else {
      const listItems = this.state.newBundleList.map((bundlename) => {
        return (
          <ListItem>
            <ListItemLabel>
              <StyledLink href={"bundle?b=" + encodeURI(bundlename)}>
                {bundlename}
              </StyledLink>
            </ListItemLabel>
          </ListItem>
        );
      });
      return (
        <ul style={{ overflow: "hidden", overflowY: "scroll" }}>{listItems}</ul>
      );
    }
  }


  newBundlesListclose() {
    this.setState({ newbundlesListOpen: false });
  }


  render() {
    const newBundleString = "added in the last build";
    let numberofBundles = "";
    let finalWidgetContent = ""
    if (this.state.isNewBundlesLoaded === true) {
      if (this.bundlesAdded === 1) {
        numberofBundles = "bundle has been";
      }
      else {
        numberofBundles = "bundles have been";
      }
      finalWidgetContent = this.state.bundlesAdded + " " + numberofBundles + " " + newBundleString;
    }
    else {
      finalWidgetContent = "..."
    }
    return (
      <div>
        <div onClick={() => this.setState({ newbundlesListOpen: true })}>
          <MyCard
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  backgroundColor: $theme.colors.accent300,
                }),
              },
            }}
            content={finalWidgetContent}
          />
        </div>
        <Modal
          onClose={this.newBundlesListclose}
          isOpen={this.state.newbundlesListOpen}
        >
          <ModalHeader>New Bundles </ModalHeader>
          <ModalBody>{this.renderList()}</ModalBody>
          <ModalFooter>
            <ModalButton onClick={this.newBundlesListclose}>Okay</ModalButton>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}