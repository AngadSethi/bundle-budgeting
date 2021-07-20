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
    if(props.mergedOutput != null){
      setStatsLoaded(true);
      setError(false);
      console.log(props.mergedOutput)
      const bundlesExceedingBudget = [];
      props.mergedOutput.forEach((bundle) => {
        const latestBundleSize = bundle.sizes[bundle.sizes.length-1];
        if(latestBundleSize > bundle.budget){
          bundlesExceedingBudget.push(bundle.name)
        }
      })
    setBundleList(bundlesExceedingBudget);
    return bundlesExceedingBudget.length;
    }
  }, [props.mergedOutput]);

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
