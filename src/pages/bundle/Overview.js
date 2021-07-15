import React, { useState, useEffect } from "react";
import { Card, StyledBody } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { H6 } from "baseui/typography";
import BundleChart from "./BundleChart";
import { Input } from 'baseui/input'
import edit from "../../edit.png";
import save from "../../save.png";
import { Image } from "react-bootstrap";
import { parseSize } from "../../shared/util";
export default function Overview(props) {
  const [OwnerEdit, setOwnerEdit] = useState(false);
  const [BudgetEdit, setBudgetEdit] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [budget, setBudget] = useState("");
  var OwnerName;
  var BudgetValue;
  var OwnerEditIcon;
  var BudgetEditIcon;

  useEffect(() => {
    setOwnerName(props.bundle.owner);
    setBudget(props.bundle.budget)
  });

  // function addEventListeners(TextField) {
  //   TextField.addEventListener("mouseover", () => {
  //     TextField.style.cursor = "pointer";
  //   });
  //   TextField.addEventListener("onblur", () => {
  //     TextField.contentEditable = false;
  //   });
  //   TextField.addEventListener("click", function listenForDoubleClick(e) {
  //     let element = e.target;
  //     element.contentEditable = true;
  //     element.style.width = "300px";
  //     setTimeout(function () {
  //       if (document.activeElement !== element) {
  //         element.contentEditable = false;
  //       }
  //     }, 300);
  //   });

  //   TextField.addEventListener("keydown", (event) => {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       event.target.contentEditable = false;
  //     }
  //   });
  // }

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
                <ListItemLabel>
                  Owner
                </ListItemLabel>
                <ListItemLabel>{
                  OwnerEdit ? (
                    <Input
                      overrides={{
                        Root: {
                          style: {
                            width: "180px"
                          }
                        },
                        Input: {
                          style: {
                            backgroundColor: "white",
                            textAlign: "center"
                          }
                        }
                      }}
                      placeholder={ownerName}
                      onChange={e => { console.log(ownerName); setOwnerName(e.target.value) }}
                      onBlur={e => { setOwnerName(e.target.value) }}
                    />
                  ) : (
                    <div>{ownerName}</div>
                  )
                }
                </ListItemLabel>
                <Image
                  onClick={(e) => {
                    let isEdit = !OwnerEdit;
                    setOwnerEdit(isEdit);

                    if (isEdit === true) {
                      e.target.src = save;
                    } else {
                      e.target.src = edit;
                    }
                    console.log(ownerName)
                  }}
                  src={edit}
                  width={"18px"}
                  height={"18px"}
                  style={{ float: "left" }}
                />
              </ListItem>
              <ListItem >
                <ListItemLabel >
                  Size
                </ListItemLabel>
                <ListItemLabel>
                  {parseSize(props.bundle.size)}
                </ListItemLabel>
              </ListItem>
              <ListItem>
                <ListItemLabel >
                  Budget
                </ListItemLabel>
                <ListItemLabel>{
                  BudgetEdit ? (
                    <Input
                      overrides={{
                        Root: {
                          style: {
                            width: "180px"
                          }
                        },
                        Input: {
                          style: {
                            backgroundColor: "white",
                            textAlign: "center"
                          }
                        }
                      }}
                      placeholder={budget}
                      onChange={e => { console.log(budget); setBudget(e.target.value) }}
                      onBlur={e => { setBudget(e.target.value) }}
                    />
                  ) : (
                    <div>{parseSize(budget)}</div>
                  )
                }
                </ListItemLabel>
                <Image
                  onClick={(e) => {
                    let isEdit = !BudgetEdit;
                    setBudgetEdit(isEdit);
                    if (isEdit === true) {
                      e.target.src = save;
                    } else {
                      e.target.src = edit;
                    }
                    console.log(budget)
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
