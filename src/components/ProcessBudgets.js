import { BUNDLE_BUDGETS_URL, BUNDLE_STATS_URL } from "../shared/endPoints";
import buildOutput from "../parseBuildOutput";

function ProcessBudget() {
  var budgetMap = new Map();
  var buildstats = {};
  var parsedBuildStats = [];
  var result = {
    bundles: [],
    orphans: [],
  };

  function buildBudgetsMap(budgets) {
    budgets.forEach((budget) => {
      budgetMap.set(budget["name"], budget);
    });
    return budgetMap;
  }

  function detectBudgetViolations() {
    parsedBuildStats.forEach((bundle) => {
      if (budgetMap.has(bundle.name)) {
        const budget = budgetMap.get(bundle.name);
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
  }

  fetch(BUNDLE_STATS_URL)
    .then((result) => result.json())
    .then((buildStats) => {
      buildstats = buildStats;
      parsedBuildStats = buildOutput(buildstats);

      fetch(BUNDLE_BUDGETS_URL)
        .then((result) => result.json())
        .then((budgets) => {
          buildBudgetsMap(budgets);

          detectBudgetViolations();

          return result;
        });
    });

  return {};
}

export default function returnResult() {
  console.log(ProcessBudget());
  return ProcessBudget();
}
