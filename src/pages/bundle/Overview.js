import React, { useState } from "react";
import { Card, StyledBody } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { H6 } from "baseui/typography";
import BundleChart from "./BundleChart";
import { Input } from "baseui/input";
import edit from "../../edit.png";
import save from "../../save.png";
import { Image } from "react-bootstrap";
import { parseSize } from "../../shared/util";

export default function Overview(props) {
  const [OwnerEdit, setOwnerEdit] = useState(false);
  const [BudgetEdit, setBudgetEdit] = useState(false);
  const [ownerName, setOwnerName] = useState(props.bundle.owner);
  const [budget, setBudget] = useState(props.bundle.budget);
  const [OwnerToggle, setOwnerToggle] = useState(true);
  const [BudgetToggle, setBudgetToggle] = useState(true);

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
                <ListItemLabel>Owner</ListItemLabel>
                <ListItemLabel>
                  {OwnerEdit || !OwnerToggle ? (
                    <Input
                      overrides={{
                        Root: {
                          style: {
                            width: "180px",
                          },
                        },
                        Input: {
                          style: {
                            backgroundColor: "white",
                            textAlign: "center",
                          },
                        },
                      }}
                      placeholder={ownerName}
                      onChange={(e) => {
                        setOwnerName(e.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === "Escape") {
                          setOwnerToggle(true);
                          event.preventDefault();
                          event.stopPropagation();
                        }
                      }}
                      onBlur={(e) => {
                        setOwnerName(e.target.value);
                        setOwnerToggle(true);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        setOwnerToggle(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {ownerName}
                    </div>
                  )}
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
                  }}
                  src={edit}
                  width={"18px"}
                  height={"18px"}
                  style={{ float: "left" }}
                />
              </ListItem>
              <ListItem
                overrides={{
                  Content: {
                    style: {
                      maxWidth: "57%",
                    }
                  }
                }}>
                <ListItemLabel>Size</ListItemLabel>
                <ListItemLabel>{parseSize(props.bundle.size)}</ListItemLabel>
              </ListItem>
              <ListItem>
                <ListItemLabel>Budget</ListItemLabel>
                <ListItemLabel>
                  {BudgetEdit || !BudgetToggle ? (
                    <Input
                      overrides={{
                        Root: {
                          style: {
                            width: "180px",
                          },
                        },
                        Input: {
                          style: {
                            backgroundColor: "white",
                            textAlign: "center",
                          },
                        },
                      }}
                      placeholder={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === "Escape") {
                          setBudgetToggle(true);
                          event.preventDefault();
                          event.stopPropagation();
                        }
                      }}
                      onBlur={(e) => {
                        setBudget(e.target.value);
                        setBudgetToggle(true);
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => {
                        setBudgetToggle(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {parseSize(budget)}
                    </div>
                  )}
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
                    console.log(budget);
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
