import React, { useState, useMemo } from "react";
import TotalSizeChart from "./TotalSizeChart";
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

export default function TotalSizeWidget(props) {
  const [totalSizeGraphOpen, setTotalSizeGraphOpen] = useState(false);
  const [sizeHistory , setSizeHistory] = useState([])
  const totalSize = useMemo(() => {
    if (props.mergedOutput !== null) {
      console.log(props.mergedOutput)
      // const numberofBuilds = props.sizeHistory.length;
      // return props.sizeHistory[numberofBuilds - 1][1];
      const buildSizeMap = new Map() // Computing Sizes For Each build
      props.mergedOutput.forEach((bundle) => {
        bundle.sizes.forEach((size) => {
          if(buildSizeMap.has(size[0])){
            const currentBuildSize = buildSizeMap.get(size[0]);
            buildSizeMap.set(size[0] , currentBuildSize + size[1]);   // Adding size if build exists
          }
          else{
            buildSizeMap.set(size[0] , size[1]);         
          }
        })
      })
      console.log(buildSizeMap)
      setSizeHistory(Array.from(buildSizeMap)); // Creating size History
      console.log(sizeHistory)
      return sizeHistory[sizeHistory.length-1][0]; // Timestamp of Last Build
    }
  }, [props.mergedOutput, sizeHistory]);

  return (
    <div>
      <div
        onClick={() => {
          setTotalSizeGraphOpen(true);
        }}
      >
        <MyCard
          content={`The Total size of the latest build is ${totalSize} MB`}
          help={"Click to view Graph"}
        />
      </div>
      <Modal
        onClose={() => setTotalSizeGraphOpen(false)}
        isOpen={totalSizeGraphOpen}
        overrides={{
          Dialog: {
            style: {
              width: '45vw',
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
                  <ListItemLabel>Total Size in MB</ListItemLabel>
                </ListItem>
              </ul>
            </FlexGridItem>
            <FlexGridItem>
              <TotalSizeChart
                name={"Total Build Size Over Time"}
                sizeHistory={sizeHistory}
              />
            </FlexGridItem>
          </FlexGrid>
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={() => setTotalSizeGraphOpen(false)}>
            Okay
          </ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}
