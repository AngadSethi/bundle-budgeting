import logo from "./logo.svg";
import "./App.css";
import BundleTable from "./components/BundleTableComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bundle Budgeting</p>
      </header>
      <BundleTable />
    </div>
  );
}

export default App;
