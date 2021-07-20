import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bundle from "./pages/bundle";
import * as React from "react";
import BuildOutput from "./shared/buildOutput";
import Home from "./pages/home";
import { useMemo } from "react";
import Header from "./pages/home/header";
import MERGED_OUTPUT from "./data/bundle-stats-named";

const computeBuildSize = (buildout) => {
  let bundles = buildout["result"]["bundles"];
  let buildSize = 0;
  for (const bundle of bundles) {
    buildSize = buildSize + bundle["data"]["size"];
  }
  buildSize = (buildSize / 1024).toFixed(3);
  return buildSize;
};

const mergeOutputs = (files) => {
  const mergedMap = new Map();

  for (const parsedOutput of files) {
    parsedOutput.budgetMap.forEach((value, key) => {
      let mergedValue = {
        ...value,
        sizes: [[value.timestamp, value.size]],
      };
      if (mergedMap.has(key)) {
        let history = mergedMap.get(key);
        mergedValue = {
          ...history,
          sizes: [...history.sizes, [value.timestamp, value.size]],
        };
      }
      mergedMap.set(key, mergedValue);
    });
  }

  const merged = [];
  mergedMap.forEach((value) => {
    merged.push(value);
  });
  return merged;
};

function App() {
  const output = useMemo(() => {
    const filesArray = [];
    const sizeHistoryArray = [];

    MERGED_OUTPUT.forEach((file, index, arr) => {
      const buildOutput = new BuildOutput();

      const res = buildOutput.build(file);
      let currentBuildSize = computeBuildSize(res);
      let buildDate = file.builtAt;
      filesArray.push(res);
      sizeHistoryArray.push([buildDate, currentBuildSize]);
    });

    console.log(filesArray);

    return {
      files: filesArray,
      sizeHistory: sizeHistoryArray,
      merged: mergeOutputs(filesArray),
    };
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          path="/bundle"
          component={(match) => (
            <Bundle
              buildOutput={
                output.files.length === MERGED_OUTPUT.length
                  ? output.files
                  : null
              }
              mergedOutput={
                output.files.length === MERGED_OUTPUT.length
                  ? output.merged
                  : null
              }
              match={match}
            />
          )}
        />
        <Route
          path="/"
          component={() => (
            <Home
              buildOutput={
                output.files.length === MERGED_OUTPUT.length
                  ? output.files
                  : null
              }
              mergedOutput={
                output.files.length === MERGED_OUTPUT.length
                  ? output.merged
                  : null
              }
              sizeHistory={
                output.files.length === MERGED_OUTPUT.length
                  ? output.sizeHistory
                  : null
              }
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
