import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./pages/home/header";
import Bundle from "./pages/bundle";
import * as React from "react";
import BuildOutput from "./shared/buildOutput";
import { FILES } from "./shared/endPoints";
import Home from "./pages/home";
import { useEffect } from "react";

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
  const [output, setOutput] = React.useState({
    files: [],
    sizeHistory: [],
  });

  useEffect(() => {
    const filesArray = [];
    const sizeHistoryArray = [];

    FILES.forEach((file, index, arr) => {
      const buildOutput = new BuildOutput();
      buildOutput.build(file).then((res) => {
        let currentBuildSize = computeBuildSize(res);
        let buildDate = res["budgetMap"].entries().next()["value"][1][
          "timestamp"
        ];
        filesArray.push(res);
        sizeHistoryArray.push([buildDate, currentBuildSize]);

        if (filesArray.length === FILES.length) {
          setOutput({
            files: filesArray,
            sizeHistory: sizeHistoryArray,
          });
        }
      });
    });
  }, []);

  const merged = mergeOutputs(output.files);

  return (
    <BrowserRouter>
      <Index />
      <Switch>
        <Route
          path="/bundle"
          component={(match) => (
            <Bundle
              buildOutput={
                output.files.length === FILES.length ? output.files : null
              }
              mergedOutput={
                output.files.length === FILES.length ? merged : null
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
                output.files.length === FILES.length ? output.files : null
              }
              mergedOutput={
                output.files.length === FILES.length ? merged : null
              }
              sizeHistory={
                output.files.length === FILES.length ? output.sizeHistory : null
              }
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
