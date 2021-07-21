import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bundle from "./pages/bundle";
import * as React from "react";
import BuildOutput from "./shared/buildOutput";
import Home from "./pages/home";
import { useEffect, useMemo, useState } from "react";
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
  const [output, setOutput] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_ENDPOINT +
        process.env.REACT_APP_BIN_ID +
        "/latest",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": process.env.REACT_APP_API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setOutput(
            result.record.map((bundle) => {
              return {
                ...bundle,
                sizes: bundle.sizes.sort((a, b) => a[0] - b[0]),
              };
            })
          );
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(false);
        }
      );
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          path="/bundle"
          component={(match) => (
            <Bundle
              buildOutput={null}
              mergedOutput={isLoaded ? output : null}
              match={match}
            />
          )}
        />
        <Route
          path="/"
          component={() => (
            <Home
              buildOutput={null}
              mergedOutput={isLoaded ? output : null}
              sizeHistory={null}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
