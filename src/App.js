import "./App.css";
import BundleTable from "./components/BundleTableComponent";
import Example from "./Table";
function App() {
  return (
    <div className="App">
      <header >
        <p>Bundle Budgeting</p>
        <Example />
      </header>
      <BundleTable />
     </div>
  );
}

export default App;
