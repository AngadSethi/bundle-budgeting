import React, { useState, useMemo } from "react";
import RenderList from "./RenderList";
import MyCard from "./MyCard";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";

export default function NewBundlesWidget(props) {
  const [newBundleList, setNewBundleList] = useState(null);
  const [newbundlesListOpen, setNewBundlesListOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isNewBundlesLoaded, setNewBundlesLoaded] = useState(false);

  const bundlesAdded = useMemo(() => {
    if (props.mergedOutput != null) {
      const newBundleNames = [];

      props.mergedOutput.forEach((bundle) => {
        if (bundle.sizes.length === 1) {
          newBundleNames.push(bundle.name);
        }
      })
      setNewBundleList(newBundleNames);
      setNewBundlesLoaded(true);
      setError(false);
      return newBundleNames.length;
    }
  }, [props.mergedOutput]);


  function newBundlesListclose() {
    setNewBundlesListOpen(false);
  }

  const newBundleString = "added in the last build";
  let numberofBundles = "";
  let finalWidgetContent = "";
  if (isNewBundlesLoaded === true) {
    if (bundlesAdded === 1) {
      numberofBundles = "bundle has been";
    } else {
      numberofBundles = "bundles have been";
    }
    if (bundlesAdded === 0) {
      finalWidgetContent = "No new " + numberofBundles + " " + newBundleString;
    } else
      finalWidgetContent =
        bundlesAdded + " " + numberofBundles + " " + newBundleString;
  } else {
    finalWidgetContent = "...";
  }
  return (
    <div>
      <div onClick={() => setNewBundlesListOpen(true)}>
        <MyCard
          content={finalWidgetContent}
          help={"Click to view List of new bundles"}
        />
      </div>
      <Modal onClose={newBundlesListclose} isOpen={newbundlesListOpen}>
        <ModalHeader>New Bundles </ModalHeader>
        <ModalBody><RenderList error={error} isLoaded={isNewBundlesLoaded} bundleList={newBundleList} widget={"NewBundles"} /></ModalBody>
        <ModalFooter>
          <ModalButton onClick={newBundlesListclose}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}
