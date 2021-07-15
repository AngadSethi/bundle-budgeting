import React, { useState, useEffect } from "react";
import { Card, StyledBody } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { H6 } from "baseui/typography";
import BundleChart from "./BundleChart";

import edit from "../../edit.png";
import save from "../../save.png";
import { Image } from "react-bootstrap";
import { parseSize } from "../../shared/util";
export default function Overview(props) {
  const [OwnerEdit, setOwnerEdit] = useState(false);
  const [BudgetEdit, setBudgetEdit] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  var OwnerName;
  var BudgetValue;
  var OwnerEditIcon;
  var BudgetEditIcon;

  useEffect(() => {
    let elementId = props.bundle.name;
    var listElement = document.getElementById(elementId);
    var textElements = listElement.getElementsByTagName("p");
    var editIcons = listElement.getElementsByTagName("img");
    OwnerName = textElements[1];
    BudgetValue = textElements[5];
    OwnerEditIcon = editIcons[0];
    BudgetEditIcon = editIcons[1];
    setOwnerName(OwnerName);
    addEventListeners(OwnerName);
    addEventListeners(BudgetValue);
  });

  function addEventListeners(TextField) {
    TextField.addEventListener("mouseover", () => {
      TextField.style.cursor = "pointer";
    });
    TextField.addEventListener("onblur", () => {
      TextField.contentEditable = false;
    });
    TextField.addEventListener("click", function listenForDoubleClick(e) {
      let element = e.target;
      element.contentEditable = true;
      element.style.width = "300px";
      setTimeout(function () {
        if (document.activeElement !== element) {
          element.contentEditable = false;
        }
      }, 300);
    });

    TextField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.target.contentEditable = false;
      }
    });
  }
  function changeBudget(BudgetEdit) {
    let isEdit = !OwnerEdit;
    setOwnerEdit(isEdit);
    if (isEdit === true) {
      BudgetEditIcon.src = save;
      console.log(BudgetValue);
      BudgetValue.style.width = "300px";
      BudgetValue.contentEditable = true;
      BudgetValue.style.border = "0.5px solid black";
    } else {
      BudgetEditIcon.src = edit;
      BudgetValue.contentEditable = false;
      BudgetValue.style.border = "0px";
    }
  }

  function editOwner(OwnerEdit) {
    let isEdit = !BudgetEdit;
    setBudgetEdit(isEdit);

    if (isEdit === true) {
      OwnerEditIcon.src = save;
      OwnerName.style.width = "300px";
      OwnerName.contentEditable = true;
      OwnerName.style.border = "0.5px solid black";
    } else {
      OwnerEditIcon.src = edit;
      OwnerName.contentEditable = false;
      OwnerName.style.border = "0px";
    }
  }
  return (
    <Card
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            border: 0,
            padding: $theme.sizing.scale100,
            boxShadow: $theme.lighting.shadow500,
            borderRadius: $theme.borders.radius200,
          }),
        },
      }}
    >
      <H6 marginTop={0} marginBottom={0}>
        {props.bundle.name}
      </H6>
      <hr />
      {/* The actual body of the card. */}
      <StyledBody>
        <FlexGrid
          flexGridColumnCount={[1, 2]}
          flexGridColumnGap="scale800"
          flexGridRowGap="scale800"
        >
          {/* The list displaying the necessary information. */}
          <FlexGridItem maxWidth={"30%"}>
            <ul
              id={props.bundle.name}
              style={{
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <ListItem>
                <ListItemLabel description={props.bundle.owner}>
                  Owner
                </ListItemLabel>
                <Image
                  onClick={() => {
                    editOwner(OwnerEdit);
                  }}
                  src={edit}
                  width={"18px"}
                  height={"18px"}
                  style={{ float: "left" }}
                />
              </ListItem>
              <ListItem>
                <ListItemLabel description={parseSize(props.bundle.size)}>
                  Size
                </ListItemLabel>
              </ListItem>
              <ListItem>
                <ListItemLabel description={parseSize(props.bundle.budget)}>
                  Budget
                </ListItemLabel>
                <Image
                  onClick={() => {
                    changeBudget(BudgetEdit);
                  }}
                  src={edit}
                  width={"17px"}
                  height={"17px"}
                />
              </ListItem>
            </ul>
          </FlexGridItem>
          <FlexGridItem>
            <BundleChart bundle={props.bundle} />
          </FlexGridItem>
        </FlexGrid>
      </StyledBody>
    </Card>
  );
}
