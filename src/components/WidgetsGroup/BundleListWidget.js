import * as React from "react";
import { BUNDLE_BUDGETS_URL, BUNDLE_STATS_URL } from "../../shared/endPoints";
import buildOutput from "../../parseBuildOutput";
import { ListItem, ListItemLabel } from "baseui/list";
import MyCard from "../MyCard";
import { StyledLink } from "baseui/link";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";

export default class BundleListWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBundles: 0,
      error: false,
      isBuildStatsLoaded: false,
      isBudgetsStatsLoaded: false,
      bundleList: [],
      budgetListOpen: false,
      budgetMap: null,
      buildStats: {},
      parsedBuildStats: [],
      result: {},
    };
    this.budgetListclose = this.budgetListclose.bind(this);
  }

  componentDidMount() {
    if (this.props.buildOutput != null) {
      let buildOut = this.props.buildOutput[this.props.buildOutput.length - 1];
      let processedResult = buildOut["result"];
      this.setState({ result: processedResult });
      this.setState({ isBuildStatsLoaded: true });
      this.setState({ isBudgetsStatsLoaded: true });
      this.setState({ error: false });
      this.createList(processedResult);
    }
  }

  renderList() {
    if (this.state.error) {
      return <div>Error Loading Data</div>;
    }
    if (!this.state.isBudgetsStatsLoaded || !this.state.isBuildStatsLoaded) {
      return <div>Data Still Loading ....</div>;
    } else {
      const listItems = this.state.bundleList.map((bundlename) => {
        return (
          <ListItem>
            <ListItemLabel>
              <StyledLink href={"bundle?b=" + encodeURI(bundlename)}>
                {bundlename}
              </StyledLink>
            </ListItemLabel>
          </ListItem>
        );
      });
      return (
        <ul style={{ overflow: "hidden", overflowY: "scroll" }}>{listItems}</ul>
      );
    }
  }
  createList(processedResult) {
    let bundlesExceedingBudget = [];
    let numberExceeding = 0;
    let bundles = processedResult["bundles"];
    for (let bundle of bundles) {
      let bundlename = bundle["id"];
      let bundledata = bundle["data"];
      let bundleOvershot = bundledata["overshot"];
      if (bundleOvershot === true) {
        bundlesExceedingBudget.push(bundlename);
        numberExceeding = numberExceeding + 1;
      }
    }
    this.setState({
      bundleList: bundlesExceedingBudget,
      numberOfBundles: numberExceeding,
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

  budgetListclose() {
    this.setState({ budgetListOpen: false });
  }

  totalSizeModalClose() {
    this.setState({ totalSizeOpen: false });
  }

  render() {
    const WidgetBody =
      this.state.numberOfBundles.toString() +
      " bundles have exceeded the Budget";
    return (
      <div>
        <div onClick={() => this.setState({ budgetListOpen: true })}>
          <MyCard
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  backgroundColor: $theme.colors.positive300,
                }),
              },
            }}
            content={WidgetBody}
            help={"Click to view the List"}
          />
        </div>

        <Modal
          onClose={this.budgetListclose}
          isOpen={this.state.budgetListOpen}
        >
          <ModalHeader>Bundles that exceeded the Budget</ModalHeader>
          <ModalBody>{this.renderList()}</ModalBody>
          <ModalFooter>
            <ModalButton onClick={this.budgetListclose}>Okay</ModalButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
