import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { H6 } from "baseui/typography";
import { StatefulTooltip } from "baseui/tooltip";
import { Block } from "baseui/block";
import { Button, SHAPE, SIZE as BUTTON_SIZE } from "baseui/button";
import { Show } from "baseui/icon";
import { Card, StyledBody } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import BundleChart from "../BundleChart";
import * as React from "react";

/**
 * Returns a card for the specific bundle. Expects a bundle object. To be used for the main overview page.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function BundleCard(props) {
  return (
    // Override styles to remove borders and give it a box shadow.
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
      <FlexGrid>
        {/* The title of the card. Can and should use a responsive width here */}
        <FlexGridItem maxWidth={"90%"}>
          <H6 marginTop={0} marginBottom={0}>
            {props.bundle.data.name}
          </H6>
        </FlexGridItem>
        {/* The eye icon. Used to peek into the bundle and view more details */}
        <FlexGridItem maxWidth={"10%"} marginLeft={"auto"}>
          {/* A tooltip to display the description of the eye icon */}
          <StatefulTooltip
            content={() => <Block>View more details about this bundle</Block>}
            returnFocus
            autoFocus
          >
            <Button
              $as="a"
              href={"bundle?b=" + encodeURI(props.bundle.data.name)}
              shape={SHAPE.circle}
              size={BUTTON_SIZE.compact}
            >
              <Show />
            </Button>
          </StatefulTooltip>
        </FlexGridItem>
      </FlexGrid>
      <hr />
      {/* The actual body of the card. */}
      <StyledBody>
        <FlexGrid
          flexGridColumnCount={[1, 2]}
          flexGridColumnGap="scale800"
          flexGridRowGap="scale800"
        >
          {/* The list displaying the necessary information. */}
          <FlexGridItem maxWidth={"scale2400"}>
            <ul
              style={{
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <ListItem>
                <ListItemLabel description={props.bundle.data.owner}>
                  Owner
                </ListItemLabel>
              </ListItem>
              <ListItem>
                <ListItemLabel description={props.bundle.data.size}>
                  Size
                </ListItemLabel>
              </ListItem>
              <ListItem>
                <ListItemLabel description={props.bundle.data.budget}>
                  Budget
                </ListItemLabel>
              </ListItem>
            </ul>
          </FlexGridItem>
          <FlexGridItem>
            <BundleChart
              name={props.bundle.data.name}
              overshot={props.bundle.data.overshot}
            />
          </FlexGridItem>
        </FlexGrid>
      </StyledBody>
    </Card>
  );
}

export default BundleCard;
