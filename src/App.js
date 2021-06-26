import "./App.css";
import BundleTable from "./components/BundleTableComponent";
import Table from "./Table";
function App() {
  return (
    <div className="App">
      <header >
        <p>Bundle Budgeting</p>
          <div style={{width: '90%' , margin: '0 auto'}}>
          <Table />
          </div>
          
      </header>
      <BundleTable />
     </div>
  );
}

export default App;
