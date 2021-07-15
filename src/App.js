import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./pages/home/header";
import Bundle from "./pages/bundle";
import * as React from "react";
import BuildOutput from "./shared/buildOutput";
import { FILES } from "./shared/endPoints";
import Home from "./pages/home";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isMerged: false,
      files: [],
      merged: null,
      sizeHistory: [],
    };
  }
  componentDidMount() {
    FILES.forEach((file, index, arr) => {
      const buildOutput = new BuildOutput();
      buildOutput.build(file).then((res) => {
        let currentBuildSize = this.computeBuildSize(res);
        let buildDate = res["budgetMap"].entries().next()["value"][1][
          "timestamp"
        ];
        this.setState({
          isLoaded: index === arr.length - 1,
          isMerged: index === arr.length - 1,
          files: [...this.state.files, res],
          merged: this.mergeOutputs([...this.state.files, res]),
          sizeHistory: [
            ...this.state.sizeHistory,
            [buildDate, currentBuildSize],
          ],
        });
      });
    });

    if (this.state.isLoaded === true) {
      this.mergeOutputs();
    }
  }

  computeBuildSize(buildout) {
    let bundles = buildout["result"]["bundles"];
    let buildSize = 0;
    for (const bundle of bundles) {
      buildSize = buildSize + bundle["data"]["size"];
    }
    buildSize = (buildSize / 1024).toFixed(3);
    return buildSize;
  }
  mergeOutputs(files) {
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
  }

  render() {
    return (
      <BrowserRouter>
        <Index />
        <Switch>
          <Route
            path="/bundle"
            component={(match) => (
              <Bundle
                buildOutput={this.state.isLoaded ? this.state.files : null}
                mergedOutput={this.state.isMerged ? this.state.merged : null}
                match={match}
              />
            )}
          />
          <Route
            path="/"
            component={() => (
              <Home
                buildOutput={this.state.isLoaded ? this.state.files : null}
                mergedOutput={this.state.isMerged ? this.state.merged : null}
                sizeHistory={
                  this.state.isMerged ? this.state.sizeHistory : null
                }
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
