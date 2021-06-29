import "./App.css";
import BundleTable from "./components/BundleTableComponent";
import Table from "./components/Table";
import Header from "./components/Header";
import AlertComponent from "./components/AlertComponent";
import Widget from "./components/Widgets";
import alerts from "./shared/alert";
import widgetdata from './shared/widgetdata';


function App() {
  return (
    <div className="App">
      <Header />
      <AlertComponent alerts={alerts} />
      <Widget insights={widgetdata} />
      <div className="Table">
        <BundleTable />
      </div>
    </div>
  );
}

export default App;
