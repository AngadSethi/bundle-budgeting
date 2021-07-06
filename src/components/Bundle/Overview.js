import * as React from "react";
import { Card, StyledBody } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { H6 } from "baseui/typography";
import BundleChart from "../BundleChart";
import edit from "../../edit.png"
import save from "../../save.png"
import { Image } from "react-bootstrap";
// import { Slider } from 'baseui/slider'
import BudgetSlider from "./Slider";
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      budgetValue: 2000,
    }
    this.editOwner = this.editOwner.bind(this)
    this.setValue = this.setValue.bind(this)
  }

  setValue(value) {
    this.setState({ budgetValue: value })
  }

  editOwner(isEdit) {
    // alert("Editing")
    let newEditValue = !isEdit;
    this.setState({ isEdit: newEditValue });

    let elementId = this.props.bundle.name
    var listElement = document.getElementById(elementId)
    var OwnerlistElement = listElement.getElementsByTagName("li")[0]
    var OwnerName = OwnerlistElement.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[1]
    var EditIcon = OwnerlistElement.getElementsByTagName("img")[0]
    if (this.state.isEdit === true) {
      EditIcon.src = save;
      OwnerName.contentEditable = true;
      OwnerName.style.border = "1px solid black";
      OwnerName.style.padding = "2px";
    }
    else {
      EditIcon.src = edit;
      OwnerName.contentEditable = false;
      OwnerName.style.border = "0px"
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
                <ListItem >
                  <ListItemLabel description={this.props.ownerDetails.owner}>
                    Owner
                  </ListItemLabel>
                  <Image onClick={() => { this.editOwner(this.state.isEdit) }} src={edit} width={"18px"} height={"18px"} style={{ float: "left" }} />
                </ListItem>
                <ListItem>
                  <ListItemLabel description={this.props.bundle.size}>
                    Size
                  </ListItemLabel>
                </ListItem>
                <ListItem>
                  <ListItemLabel description={this.props.ownerDetails.budget}>
                    Budget
                  </ListItemLabel>
                  <BudgetSlider />
                </ListItem>
              </ul>
            </FlexGridItem>
            <FlexGridItem>
              <BundleChart
                name={this.props.bundle.name}
                overshot={this.props.bundle.overshot}
              />
            </FlexGridItem>
          </FlexGrid>
        </StyledBody>
      </Card>
    );
  }
}

export default Overview;
