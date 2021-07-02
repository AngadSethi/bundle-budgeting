import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Card, StyledBody } from "baseui/card";
import { BUNDLE_BUDGETS_URL, BUNDLE_STATS_URL } from "../shared/endPoints";
import buildOutput from "../parseBuildOutput";
import { H6 } from "baseui/typography";
import { ListItem, ListItemLabel } from "baseui/list";
import { Pagination, SIZE } from "baseui/pagination";
import BundleChart from "./BundleChart";

class CardGroup extends React.Component {
  constructor(props) {
    super(props);

    this.PER_PAGE = 1;

    this.state = {
      budgetMap: null,
      buildStats: {},
      error: null,
      isLoaded: false,
      parsedBuildStats: [],
      result: {},
      currentPage: 1,
    };
  }

  componentDidMount() {
    fetch(BUNDLE_STATS_URL)
      .then((result) => result.json())
      .then((buildStats) => {
        this.setState({
          ...this.state,
          isLoaded: true,
          buildStats: buildStats,
          parsedBuildStats: buildOutput(buildStats, this.props.fileType),
        });

        fetch(BUNDLE_BUDGETS_URL)
          .then((result) => result.json())
          .then((budgets) => {
            this.buildBudgetsMap(budgets);

            this.detectBudgetViolations();
          });
      });
  }

  buildBudgetsMap(budgets) {
    const budgetMap = new Map();

    budgets.forEach((budget) => {
      budgetMap.set(budget["name"], budget);
    });

    this.setState({
      ...this.state,
      budgetMap: budgetMap,
    });
  }

  detectBudgetViolations() {
    const result = {
      bundles: [],
      orphans: [],
    };

    this.state.parsedBuildStats.forEach((bundle) => {
      if (this.state.budgetMap.has(bundle.name)) {
        const budget = this.state.budgetMap.get(bundle.name);
        result.bundles.push({
          id: bundle.name,
          data: {
            ...bundle,
            overshot: budget.budget - bundle.size < 0,
            budget: budget.budget,
            difference: budget.budget - bundle.size,
            owner: budget.owner,
          },
        });
      } else {
        result.orphans.push(bundle);
      }
    });
    this.setState({
      ...this.state,
      result: result,
    });
  }

  renderCards() {
    return this.state.result.bundles
      .slice(
        (this.state.currentPage - 1) * this.PER_PAGE,
        this.state.currentPage * this.PER_PAGE
      )
      .map((bundle) => {
        return (
          <FlexGridItem>
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
                {bundle.data.name}
              </H6>
              <hr />
              <StyledBody>
                <FlexGrid
                  flexGridColumnCount={[1, 2]}
                  flexGridColumnGap="scale800"
                  flexGridRowGap="scale800"
                >
                  <FlexGridItem maxWidth={"scale2400"}>
                    <ul
                      style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                      }}
                    >
                      <ListItem>
                        <ListItemLabel description={bundle.data.owner}>
                          Owner
                        </ListItemLabel>
                      </ListItem>
                      <ListItem>
                        <ListItemLabel description={bundle.data.size}>
                          Size
                        </ListItemLabel>
                      </ListItem>
                      <ListItem>
                        <ListItemLabel description={bundle.data.budget}>
                          Budget
                        </ListItemLabel>
                      </ListItem>
                    </ul>
                  </FlexGridItem>
                  <FlexGridItem>
                    <BundleChart
                      name={bundle.data.name}
                      overshot={bundle.data.overshot}
                    />
                  </FlexGridItem>
                </FlexGrid>
              </StyledBody>
            </Card>
          </FlexGridItem>
        );
      });
  }

  render() {
    if (this.state.result && this.state.result.bundles) {
      const NUM_PAGES = Math.ceil(
        this.state.result.bundles.length / this.PER_PAGE
      );
      return (
        <div>
          <FlexGrid
            flexGridColumnCount={[1, 2, 4]}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
          >
            {this.renderCards()}
          </FlexGrid>
          <FlexGrid justifyContent={"center"} marginTop={"scale1000"}>
            <Pagination
              numPages={NUM_PAGES}
              size={SIZE.compact}
              currentPage={this.state.currentPage}
              onPageChange={({ nextPage }) => {
                this.setState({
                  currentPage: Math.min(Math.max(nextPage, 1), NUM_PAGES),
                });
              }}
            />
          </FlexGrid>
        </div>
      );
    }
    return <div />;
  }
}

export default CardGroup;
