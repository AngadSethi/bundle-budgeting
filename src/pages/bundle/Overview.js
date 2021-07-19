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
  const [isOwnerHovering, setOwnerHovering] = useState(false);
  const [isBudgetHovering, setBudgetHovering] = useState(false);

  const handleOwnerHover = () => {
    setOwnerHovering(true);
  }
  const handleOwnerOut = () => {
    setOwnerHovering(false);
  }
  const handleBudgetHover = () => {
    setBudgetHovering(true);
  }
  const handleBudgetOut = () => {
    setBudgetHovering(false);
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
                <ListItemLabel>Owner</ListItemLabel>
                <div style={{ display: "inline-flex", width: "65%" }} onMouseOver={handleOwnerHover} onMouseOut={handleOwnerOut}>
                  <div style={{ width: "80%" }}>
                    {OwnerEdit || !OwnerToggle ? (
                      <Input
                        overrides={{
                          Root: {
                            style: {
                              width: "80%",
                            },
                          },
                          Input: {
                            style: {
                              backgroundColor: "white",
                              paddingLeft: "3px"
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
                        style={{ cursor: "pointer", fontWeight: "500" }}
                      >
                        {ownerName}
                      </div>
                    )}
                  </div>
                  <div>
                    {isOwnerHovering &&
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
                        style={{ float: "left", cursor: "pointer" }}
                      />}
                  </div>
                </div>
              </ListItem>
              <ListItem
                overrides={{
                  Content: {
                    style: {
                      maxWidth: "48%",
                    }
                  }
                }}>
                <ListItemLabel>Size</ListItemLabel>
                <ListItemLabel>{parseSize(props.bundle.size)}</ListItemLabel>
              </ListItem>
              <ListItem>
                <ListItemLabel>Budget</ListItemLabel>
                <div style={{ display: "inline-flex", width: "64%" }} onMouseOver={handleBudgetHover} onMouseOut={handleBudgetOut}>
                  <div style={{ width: "80%" }}>
                    {BudgetEdit || !BudgetToggle ? (
                      <Input
                        overrides={{
                          Root: {
                            style: {
                              width: "60%",
                            },
                          },
                          Input: {
                            style: {
                              backgroundColor: "white",
                              paddingLeft: "3px"
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
                        style={{ cursor: "pointer", fontWeight: "500" }}
                      >
                        {parseSize(budget)}
                      </div>
                    )}
                  </div>
                  <div>
                    {isBudgetHovering && <Image
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
                      style={{ float: "left", cursor: "pointer" }}
                    />}
                  </div>
                </div>
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
