import "./App.css";
import BundleTable from "./components/BundleTableComponent";
import Table from "./components/Table";
import Header from "./components/Header";
import AlertComponent from "./components/AlertComponent";
import alerts from "./shared/alert";

function App() {
  return (
    <div className="App">
      <Header />
      <AlertComponent alerts={alerts} />
      <div className="Table">
        <BundleTable />
      </div>
    </div>
  );
}

export default App;
