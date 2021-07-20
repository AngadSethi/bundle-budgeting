import buildOutput from "../parseBuildOutput";
import BUDGETS from "../data/budgets-split";

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

  build(result, extensions = ["js", "css"]) {
    this.isLoaded = true;
    this.buildStats = result;
    this.parsedBuildStats = buildOutput(result);

    this.buildBudgetsMap(BUDGETS);

    this.detectBudgetViolations();

    return this.getStateObject(extensions);
  }

  buildBudgetsMap(budgets) {
    budgets.forEach((budget) => {
      const pOutput = this.parsedBuildStats.find(
        (value) => value.name.localeCompare(budget.name) === 0
      );
      if (pOutput !== undefined) {
        this.budgetMap.set(budget.name, {
          ...budget,
          size: pOutput.size,
          hash: pOutput.hash,
          timestamp: pOutput.timestamp,
        });
      }
    });
  }

  detectBudgetViolations() {
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

  getStateObject() {
    return {
      budgetMap: this.budgetMap,
      parsedBuildStats: this.parsedBuildStats,
      result: this.result,
      isLoaded: true,
    };
  }
}

export default BuildOutput;
