import "./App.css";
import BundleTable from "./components/BundleTableComponent";
import Table from "./components/Table";
import Header from "./components/Header";
import AlertComponent from "./components/AlertComponent";
import Widget from "./components/Widgets";
import alerts from "./shared/alert";
import widgetdata from "./shared/widgetdata";
import tabs from "./shared/tabData";
import TabGroup from "./components/TabGroup";
import { Block } from "baseui/block";

function App() {
  return (
    <Block>
      <Header />
      <Block
        margin={"auto"}
        paddingLeft={"3em"}
        paddingRight={"3em"}
        paddingTop={"2em"}
      >
        <AlertComponent alerts={alerts} />
        <Widget insights={widgetdata} />
        <TabGroup tabs={tabs} />
      </Block>
    </Block>
  );
}

export default App;
