import * as React from "react";
import { Card, StyledBody } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { H6 } from "baseui/typography";
import BundleChart from "../BundleChart";
import edit from "../../edit.png";
import save from "../../save.png";
import { Slider } from "baseui/slider";
import { Image } from "react-bootstrap";
// import { Slider } from 'baseui/slider'
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      budgetValue: [50],
      ownerName: "",
    };
    this.editOwner = this.editOwner.bind(this);
    this.setBudget = this.setBudget.bind(this);
    this.changeBudget = this.changeBudget.bind(this);
  }

  componentDidMount() {
    let elementId = this.props.bundle.name;
    var listElement = document.getElementById(elementId);
    var OwnerlistElement = listElement.getElementsByTagName("li")[0];
    var OwnerName = OwnerlistElement.getElementsByTagName("p")[1];
    this.setState({ ownerName: OwnerName });
    this.addEventListeners(OwnerName);
  }

  addEventListeners(OwnerName) {
    OwnerName.addEventListener("mouseover", () => {
      OwnerName.style.cursor = "pointer";
    });
    OwnerName.addEventListener("onblur", () => {
      OwnerName.contentEditable = false;
    });
    OwnerName.addEventListener("click", function listenForDoubleClick(e) {
      let element = e.target;
      element.contentEditable = true;
      element.style.width = "300px";
      OwnerName.style.padding = "3px";
      setTimeout(function () {
        if (document.activeElement !== element) {
          element.contentEditable = false;
        }
      }, 300);
    });

    OwnerName.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.target.contentEditable = false;
      }
    });
  }
  changeBudget(newBudget) {
    let elementId = this.props.bundle.name;
    var listElement = document.getElementById(elementId);
    var OwnerlistElement = listElement
      .getElementsByTagName("li")[2]
      .getElementsByTagName("p")[1];

    OwnerlistElement.innerHTML = this.state.budgetValue;
  }
  setBudget(newValue) {
    this.setState({ budgetValue: newValue });
  }

  editOwner(isEdit) {
    // alert("Editing")
    let newEditValue = !isEdit;
    this.setState({ isEdit: newEditValue });

    let elementId = this.props.bundle.name;
    var listElement = document.getElementById(elementId);
    var OwnerlistElement = listElement.getElementsByTagName("li")[0];
    var OwnerName = OwnerlistElement.getElementsByTagName("p")[1];
    var EditIcon = OwnerlistElement.getElementsByTagName("img")[0];
    if (this.state.isEdit === true) {
      EditIcon.src = save;
      OwnerName.style.width = "300px";
      OwnerName.contentEditable = true;
      OwnerName.style.border = "1px solid black";
      OwnerName.style.padding = "2px";
    } else {
      EditIcon.src = edit;
      OwnerName.contentEditable = false;
      OwnerName.style.border = "0px";
    }
  }

  render() {
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
          {this.props.bundle.name}
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
                id={this.props.bundle.name}
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                <ListItem>
                  <ListItemLabel description={this.props.bundle.owner}>
                    Owner
                  </ListItemLabel>
                  <Image
                    onClick={() => {
                      this.editOwner(this.state.isEdit);
                    }}
                    src={edit}
                    width={"18px"}
                    height={"18px"}
                    style={{ float: "left" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemLabel description={this.props.bundle.size}>
                    Size
                  </ListItemLabel>
                </ListItem>
                <ListItem>
                  <ListItemLabel description={this.props.bundle.budget}>
                    Budget
                  </ListItemLabel>

                  <Slider
                    overrides={{
                      Root: {
                        style: {
                          width: "70%",
                        },
                      },
                      Thumb: {
                        style: {
                          width: "15px",
                          height: "15px",
                        },
                      },
                    }}
                    min={10}
                    max={2000}
                    value={this.state.budgetValue}
                    onChange={({ value }) => value && this.setBudget(value)}
                    onFinalChange={({ value }) =>
                      value && this.changeBudget(value)
                    }
                  />
                </ListItem>
              </ul>
            </FlexGridItem>
            <FlexGridItem>
              <BundleChart bundle={this.props.bundle} />
            </FlexGridItem>
          </FlexGrid>
        </StyledBody>
      </Card>
    );
  }
}

export default Overview;
