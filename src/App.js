import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import Header from "./components/Header";
import Bundle from "./components/Bundle";
import * as React from "react";
import BuildOutput from "./shared/BuildOutput";
import { FILES } from "./shared/endPoints";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isMerged: false,
      files: [],
      merged: null,
    };
  }
  componentDidMount() {
    FILES.forEach((file, index, arr) => {
      const buildOutput = new BuildOutput();
      buildOutput.build(file).then((res) => {
        this.setState({
          isLoaded: index === arr.length - 1,
          isMerged: index === arr.length - 1,
          files: [...this.state.files, res],
          merged: this.mergeOutputs([...this.state.files, res]),
        });
      });
    });

    if (this.state.isLoaded === true) {
      this.mergeOutputs();
    }
  }

  mergeOutputs(files) {
    const mergedMap = new Map();

    for (const parsedOutput of files) {
      parsedOutput.budgetMap.forEach((value, key) => {
        let mergedValue = {
          ...value,
          sizes: [[value.hash, value.size]],
        };
        if (mergedMap.has(key)) {
          let history = mergedMap.get(key);
          mergedValue = {
            ...history,
            sizes: [...history.sizes, [value.hash, value.size]],
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
        <Header />
        <Switch>
          <Route
            path="/bundle"
            component={() => (
              <Bundle
                buildOutput={this.state.isLoaded ? this.state.files : null}
                mergedOutput={this.state.isMerged ? this.state.merged : null}
              />
            )}
          />
          <Route
            path="/"
            component={() => (
              <HomeComponent
                buildOutput={this.state.isLoaded ? this.state.files : null}
                mergedOutput={this.state.isMerged ? this.state.merged : null}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
