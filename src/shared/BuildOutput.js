import { BUNDLE_BUDGETS_URL, BUNDLE_STATS_URL } from "./endPoints";
import buildOutput from "../parseBuildOutput";

class BuildOutput {
  constructor() {
    this.isLoaded = false;
    this.buildStats = null;
    this.parsedBuildStats = null;
    this.budgetMap = new Map();
    this.result = {
      bundles: [],
      orphans: [],
    };
  }

  async build(filePath, extensions = ["js", "css"]) {
    const result = fetch(BUNDLE_STATS_URL + filePath)
      .then((result) => result.json())
      .then((buildStats) => {
        this.isLoaded = true;
        this.buildStats = buildStats;
        this.parsedBuildStats = buildOutput(buildStats);
      })
      .then(() => {
        return fetch(BUNDLE_BUDGETS_URL);
      });

    return result
      .then((result) => result.json())
      .then((budgets) => {
        this.buildBudgetsMap(budgets);

        this.detectBudgetViolations();

        return this.getStateObject(extensions);
      });
  }

  buildBudgetsMap(budgets) {
    budgets.forEach((budget) => {
      const pOutput = this.parsedBuildStats.find(
        (value) => value.name.localeCompare(budget["name"]) === 0
      );
      this.budgetMap.set(budget["name"], {
        ...budget,
        size: pOutput.size,
        hash: pOutput.hash,
      });
    });
  }

  async detectBudgetViolations() {
    this.parsedBuildStats.forEach((bundle) => {
      if (this.budgetMap.has(bundle.name)) {
        const budget = this.budgetMap.get(bundle.name);

        let percentage = Math.round(
          ((bundle.size - budget.budget) / budget.budget) * 100
        );
        if (bundle.size < budget.budget) {
          percentage = Math.round(
            ((bundle.size - budget.budget) / bundle.size) * 100
          );
        }
        this.result.bundles.push({
          id: bundle.name,
          data: {
            ...bundle,
            overshot: budget.budget - bundle.size < 0,
            budget: budget.budget,
            difference: bundle.size - budget.budget,
            owner: budget.owner,
            percentage: percentage,
          },
        });
      } else {
        this.result.orphans.push(bundle);
      }
    });

    return this.result;
  }

  filterResults(extensions) {
    const regex = new RegExp("^.*\\.(" + extensions.join("|") + ")$", "i");

    const newResult = this.result;

    newResult.bundles = newResult.bundles.filter((bundle) =>
      regex.test(bundle.data.name)
    );
    newResult.orphans = newResult.orphans.filter((bundle) =>
      regex.test(bundle.name)
    );

    return newResult;
  }

  getStateObject(extensions) {
    const newResult = this.filterResults(extensions);
    return {
      budgetMap: this.budgetMap,
      parsedBuildStats: this.parsedBuildStats,
      result: newResult,
      isLoaded: true,
    };
  }
}

export default BuildOutput;
