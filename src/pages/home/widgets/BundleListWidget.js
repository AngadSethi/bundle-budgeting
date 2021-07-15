import React, { useState, useEffect } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import MyCard from "./MyCard";
import { StyledLink } from "baseui/link";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import { generateBundleUrl } from "../../../shared/util";

export default function BundleListWidget(props) {
  const [numberOfBundles, setNumberOfBundles] = useState(0);
  const [error, setError] = useState(false);
  const [isBuildStatsLoaded, setBuildStatsLoaded] = useState(false);
  const [isBudgetStatsLoaded, setBudgetStatsLoaded] = useState(false);
  const [budgetListOpen, setBudgetListOpen] = useState(false);
  const [bundleList, setBundleList] = useState([]);

  useEffect(() => {
    if (props.buildOutput != null) {
      let buildOut = props.buildOutput[props.buildOutput.length - 1];
      let processedResult = buildOut["result"];
      setBuildStatsLoaded(true);
      setBudgetStatsLoaded(true);
      setError(false);
      createList(processedResult);
    }
  }, [props.buildOutput]);
  function renderList() {
    if (error) {
      return <div>Error Loading Data</div>;
    }
    if (!isBudgetStatsLoaded || !isBuildStatsLoaded) {
      return <div>Data Still Loading ....</div>;
    } else {
      const listItems = bundleList.map((bundlename) => {
        return (
          <ListItem
            overrides={{
              Root: {
                style: {
                  padding: 0,
                },
              },
            }}
          >
            <ListItemLabel>
              <StyledLink href={generateBundleUrl(bundlename)}>
                {bundlename}
              </StyledLink>
            </ListItemLabel>
          </ListItem>
        );
      });
      return (
        <ul
          style={{
            overflowY: "auto",
          }}
        >
          {listItems}
        </ul>
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

  const WidgetBody =
    numberOfBundles.toString() + " bundles have exceeded the Budget";
  return (
    <div>
      <div onClick={() => setBudgetListOpen(true)}>
        <MyCard content={WidgetBody} help={"Click to view the List"} />
      </div>

      <Modal onClose={budgetListclose} isOpen={budgetListOpen}>
        <ModalHeader>Bundles that exceeded the Budget</ModalHeader>
        <hr />
        <ModalBody>{renderList()}</ModalBody>
        <ModalFooter>
          <ModalButton onClick={budgetListclose}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}
