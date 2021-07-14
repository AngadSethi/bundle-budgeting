import React, { useState, useEffect } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import MyCard from "../MyCard";
import { StyledLink } from "baseui/link";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";

export default function BundleListWidget(props) {

  const [numberOfBundles, setNumberOfBundles] = useState(0);
  const [error, setError] = useState(false);
  const [isBuildStatsLoaded, setBuildStatsLoaded] = useState(false);
  const [isBudgetStatsLoaded, setBudgetStatsLoaded] = useState(false);
  const [budgetListOpen, setBudgetListOpen] = useState(false);
  const [bundleList, setBundleList] = useState([])
  const [buildResult, setBuildResult] = useState({})

  useEffect(() => {
    if (props.buildOutput != null) {
      let buildOut = props.buildOutput[props.buildOutput.length - 1];
      let processedResult = buildOut["result"];
      setBuildResult(processedResult);
      setBuildStatsLoaded(true);
      setBudgetStatsLoaded(true);
      setError(false);
      createList(processedResult);
    }
  })
  function renderList() {
    if (error) {
      return <div>Error Loading Data</div>;
    }
    if (!(isBudgetStatsLoaded) || !(isBuildStatsLoaded)) {
      return <div>Data Still Loading ....</div>;
    } else {
      const listItems = bundleList.map((bundlename) => {
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

  function createList(processedResult) {
    let bundlesExceedingBudget = [];
    let numberExceeding = 0;
    let bundles = processedResult["bundles"];
    for (let bundle of bundles) {
      let bundlename = bundle["id"];
      let bundledata = bundle["data"];
      let bundleOvershot = bundledata["overshot"];
      if (bundleOvershot === true) {
        bundlesExceedingBudget.push(bundlename);
        numberExceeding = numberExceeding + 1;
      }
    }
    setBundleList(bundlesExceedingBudget);
    setNumberOfBundles(numberExceeding);
  }

  function budgetListclose() {
    setBudgetListOpen(false);
  }

  const WidgetBody = numberOfBundles.toString() + " bundles have exceeded the Budget";
  return (
    <div>
      <div onClick={() => setBudgetListOpen(true)}>
        <MyCard
          content={WidgetBody}
          help={"Click to view the List"}
        />
      </div>

      <Modal
        onClose={budgetListclose}
        isOpen={budgetListOpen}
      >
        <ModalHeader>Bundles that exceeded the Budget</ModalHeader>
        <ModalBody>{renderList()}</ModalBody>
        <ModalFooter>
          <ModalButton onClick={budgetListclose}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </div >
  );
}