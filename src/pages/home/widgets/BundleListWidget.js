import React, { useState, useMemo } from "react";
import MyCard from "./MyCard";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import RenderList from "./RenderList";
export default function BundleListWidget(props) {
  const [error, setError] = useState(false);
  const [isStatsLoaded, setStatsLoaded] = useState(false);
  const [budgetListOpen, setBudgetListOpen] = useState(false);
  const [bundleList, setBundleList] = useState([]);

  const numberOfBundles = useMemo(() => {
    if (props.buildOutput != null) {
      const buildOut = props.buildOutput[props.buildOutput.length - 1];
      const processedResult = buildOut["result"];
      setStatsLoaded(true);
      setError(false);
      return createList(processedResult);
    }
  }, [props.buildOutput]);

  function createList(processedResult) {
    const bundlesExceedingBudget = [];
    const bundles = processedResult.bundles;
    bundles.forEach((bundle) => {
      if (bundle.data.overshot === true) {
        bundlesExceedingBudget.push(bundle.id);
      }
    })
    setBundleList(bundlesExceedingBudget);
    return bundlesExceedingBudget.length;
  }

  function budgetListclose() {
    setBudgetListOpen(false);
  }

  const WidgetBody =
    `${numberOfBundles}  bundles have exceeded the Budget`;
  return (
    <div>
      <div onClick={() => setBudgetListOpen(true)}>
        <MyCard content={WidgetBody} help={"Click to view the List"} />
      </div>

      <Modal onClose={budgetListclose} isOpen={budgetListOpen}>
        <ModalHeader>Bundles that exceeded the Budget</ModalHeader>
        <hr />
        <ModalBody><RenderList error={error} isLoaded={isStatsLoaded} bundleList={bundleList} widget={"BudgetBundles"} /></ModalBody>
        <ModalFooter>
          <ModalButton onClick={budgetListclose}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}
