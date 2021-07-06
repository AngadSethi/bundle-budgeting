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

  async function fetchData() {
    let response = await fetch(BUNDLE_STATS_URL);
    let buildStats = await response.json();
    buildstats = buildStats;
    parsedBuildStats = buildOutput(buildstats);

    let budgetdata = await fetch(BUNDLE_BUDGETS_URL);
    let budgets = await budgetdata.json();

    buildBudgetsMap(budgets);
    detectBudgetViolations();

  }

  fetchData().catch(e => {
    console.log("Error fetching data")
  })

  // fetch(BUNDLE_STATS_URL)
  //   .then((result) => result.json())
  //   .then((buildStats) => {
  //     buildstats = buildStats;
  //     parsedBuildStats = buildOutput(buildstats);

  //     fetch(BUNDLE_BUDGETS_URL)
  //       .then((result) => result.json())
  //       .then((budgets) => {
  //         buildBudgetsMap(budgets);

  //         detectBudgetViolations();

  //         return result;
  //       });
  //   });
  return result;
}

export default function returnResult() {
  var processedBudggets = ProcessBudget()

  return processedBudggets;
}
