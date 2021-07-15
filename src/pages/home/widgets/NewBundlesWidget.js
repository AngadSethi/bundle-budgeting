import React, { useState, useEffect } from "react";
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
  const [bundlesAdded, setBundlesAdded] = useState(0);
  const [newBundleList, setNewBundleList] = useState(null);
  const [newbundlesListOpen, setNewBundlesListOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isNewBundlesLoaded, setNewBundlesLoaded] = useState(false);

  useEffect(() => {
    if (props.mergedOutput != null) {
      const newBundleNames = [];
      for (let bundle of props.mergedOutput) {
        if (bundle["sizes"].length === 1) {
          newBundleNames.push(bundle["name"]);
        }
      }
      setBundlesAdded(newBundleNames.length);
      setNewBundleList(newBundleNames);
      setNewBundlesLoaded(true);
      setError(false);
    }
  }, [props.mergedOutput]);

  // function renderList() {
  //   if (error) {
  //     return <div>Error Loading Data</div>;
  //   }
  //   if (isNewBundlesLoaded === false) {
  //     return <div>Data Still Loading ....</div>;
  //   } else if (newBundleList.length === 0) {
  //     return <div> No new Bundles have been added in the last build</div>;
  //   } else {
  //     const listItems = newBundleList.map((bundlename) => {
  //       return (
  //         <ListItem
  //           overrides={{
  //             Root: {
  //               style: {
  //                 padding: 0,
  //               },
  //             },
  //           }}
  //         >
  //           <ListItemLabel>
  //             <StyledLink href={"bundle?b=" + encodeURI(bundlename)}>
  //               {bundlename}
  //             </StyledLink>
  //           </ListItemLabel>
  //         </ListItem>
  //       );
  //     });
  //     return (
  //       <ul
  //         style={{
  //           overflow: "auto",
  //           overflowY: "scroll",
  //           border: "1px solid black",
  //           borderRadius: "7px",
  //         }}
  //       >
  //         {listItems}
  //       </ul>
  //     );
  //   }
  // }

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
