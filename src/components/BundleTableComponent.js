import { Component } from "react";
import { BUNDLE_BUDGETS_URL, BUNDLE_STATS_URL } from "../shared/endPoints";
import buildOutput from "../parseBuildOutput";
import {
  CustomColumn,
  NUMERICAL_FORMATS,
  NumericalColumn,
  StatefulDataTable,
  StringColumn,
} from "baseui/data-table";
import { Block } from "baseui/block";
import { ProgressBar } from "baseui/progress-bar";

class BundleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budgetMap: null,
      buildStats: {},
      error: null,
      isLoaded: false,
      parsedBuildStats: [],
      result: {},
    };

    this.columns = [
      StringColumn({
        title: "Bundle Name",
        mapDataToValue: (data) => data.name,
      }),
      StringColumn({
        title: "Bundle Owner",
        mapDataToValue: (data) => data.owner,
      }),
      NumericalColumn({
        title: "Bundle Size",
        format: NUMERICAL_FORMATS.DEFAULT,
        mapDataToValue: (data) => data.size,
      }),
      CustomColumn({
        title: "Budget Violation",
        mapDataToValue: (data) => data,
        renderCell: function Cell(props) {
          const percentage = Math.round(
            (Math.abs(props.value.size - props.value.budget) /
              props.value.budget) *
              100
          );

          return (
            <ProgressBar
              value={percentage}
              successValue={100}
              overrides={{
                BarProgress: {
                  style: ({ $theme }) => ({
                    backgroundColor:
                      props.value.difference < 0
                        ? $theme.colors.negative
                        : $theme.colors.positive,
                  }),
                },
              }}
              showLabel
              getProgressLabel={(value) => {
                return (
                  value +
                  "% " +
                  (percentage >= 100 ? "above" : "below") +
                  " budget"
                );
              }}
            />
          );
        },
      }),
    ];
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

  render() {
    if (this.state.result && this.state.result.bundles) {
      return (
        <Block height={"300px"}>
          <StatefulDataTable
            columns={this.columns}
            rows={this.state.result.bundles}
            rowHeight={78}
          />
        </Block>
      );
    }
    return <div />;
  }
}

export default BundleTable;
