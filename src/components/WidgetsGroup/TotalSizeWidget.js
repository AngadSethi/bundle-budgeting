import React, { useState, useEffect } from "react";
import TotalSizeChart from "./TotalSizeChart";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { ListItem, ListItemLabel } from "baseui/list";

import MyCard from "../MyCard";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";

export default function TotalSizeWidget(props) {

  const [totalSize, setTotalSize] = useState(0);
  const [totalSizeGraphOpen, setTotalSizeGraphOpen] = useState(false);

  // sizeHistory: this.props.sizeHistory,

  useEffect(() => {
    if (props.buildOutput != null) {
      let numberofBuilds = props.sizeHistory.length;
      setTotalSize(props.sizeHistory[numberofBuilds - 1])
    }
  })

  function totalSizeModalClose() {
    setTotalSizeGraphOpen(false);
  }

  return (
    <div>
      <div onClick={() => setTotalSizeGraphOpen(true)}>
        <MyCard
          content={
            "The Total size of the latest build is " + totalSize + " MB"
          }
          help={"Click to view Graph"}
        />
      </div>
      <Modal
        onClose={totalSizeModalClose}
        isOpen={totalSizeGraphOpen}
        overrides={{
          Dialog: {
            style: {
              width: '50vw',
              height: '45vh',
              display: 'flex',
              flexDirection: 'column',
            }
          }
        }}
      >
        <ModalHeader>Total Size of Bundles over builds</ModalHeader>
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
                  <ListItemLabel>Total Size in KiB</ListItemLabel>
                </ListItem>
              </ul>
            </FlexGridItem>
            <FlexGridItem>
              <TotalSizeChart
                name={"Total Build Size Over Time"}
                sizeHistory={props.sizeHistory}
              // overshot={bundle.data.overshot}
              />
            </FlexGridItem>
          </FlexGrid>
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={totalSizeModalClose}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};