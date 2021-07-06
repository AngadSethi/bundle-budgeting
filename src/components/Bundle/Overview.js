import * as React from "react";
import { Card, StyledBody } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { H6 } from "baseui/typography";
import { StatefulTooltip } from "baseui/tooltip";
import { Block } from "baseui/block";
import { Button, SHAPE, SIZE as BUTTON_SIZE } from "baseui/button";
import { Show } from "baseui/icon";
import BundleChart from "../BundleChart";

class Overview extends React.Component {
  constructor(props) {
    super(props);
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
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                <ListItem>
                  <ListItemLabel description={this.props.ownerDetails.owner}>
                    Owner
                  </ListItemLabel>
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
