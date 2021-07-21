import React, { useState, useMemo} from "react";
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
import { parseSize } from "../../../shared/util";

export default function TotalSizeWidget(props) {
  const [totalSizeGraphOpen, setTotalSizeGraphOpen] = useState(false);
  const [isStatsLoaded, setStatsLoaded] = useState(false)
  const [totalSize , setTotalSize] = useState(0);
  const sizeHistory = useMemo(() => {
    if (props.mergedOutput !== null) {
      // console.log(props.mergedOutput)
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
      setStatsLoaded(true);
      const buildSizes = Object.fromEntries(buildSizeMap)
      console.log(buildSizes)
      const latestBuildTime = Math.max.apply(null, Object.keys(buildSizes)); // Timestamp of latest build
      setTotalSize(buildSizes[latestBuildTime]);
      return buildSizes; 
    }
  }, [props.mergedOutput]);
  return (
    <div>
      <div
        onClick={() => {
          setTotalSizeGraphOpen(true);
        }}
      >
        <MyCard
          content={`The Total size of the latest build is ${parseSize(totalSize)}`}
          help={"Click to view Graph"}
        />
      </div>
      <Modal
        onClose={() => setTotalSizeGraphOpen(false)}
        isOpen={totalSizeGraphOpen}
        overrides={{
          Dialog: {
            style: {
              width: "45vw",
              display: "flex",
              flexDirection: "column",
            },
          },
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
