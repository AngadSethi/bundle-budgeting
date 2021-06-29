import "./App.css";
import BundleTable from "./components/BundleTableComponent";
import Table from "./components/Table";
import Header from './components/Header'
function App() {
  return (
    <div className="App">
      <Header />   
      <div className="Table" >
        <Table />
      </div>
      <BundleTable />
     </div>
  );
}

export default App;
