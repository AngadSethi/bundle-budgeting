import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import BundleComponent from "./components/BundleComponent";
import Header from "./components/Header";

function App() {
  console.warn = () => {};
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/bundle" component={BundleComponent}>
          <BundleComponent />
        </Route>
        <Route path="/">
          <HomeComponent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
