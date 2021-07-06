import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import Header from "./components/Header";
import Bundle from "./components/Bundle";
import * as React from "react";
import BuildOutput from "./shared/BuildOutput";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };
  }
  componentDidMount() {
    const buildOutput = new BuildOutput();
    buildOutput.build().then((res) => {
      this.setState({
        isLoaded: true,
        result: res,
      });
    });
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
                buildOutput={this.state.isLoaded ? this.state.result : null}
              />
            )}
          />
          <Route
            path="/"
            component={() => (
              <HomeComponent
                buildOutput={this.state.isLoaded ? this.state.result : null}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
