import "./App.css";
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
    <Block backgroundColor={["#DBDBDB"]} height={"100vh"}>
      <Header />
      <Block
        margin={"auto"}
        paddingLeft={"3em"}
        paddingRight={"3em"}
        paddingTop={"2em"}
      >
        <Widget insights={widgetdata} />
        <TabGroup tabs={tabs} />
      </Block>
    </Block>
  );
}

export default App;
