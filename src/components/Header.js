import { Component, Nav, NavDropdown, Navbar } from "react";
import "../App.css";
import navicon from "../navicon.png";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <img
            alt="navbar"
            src={navicon}
            style={{ display: "flex", width: "50px", height: "50px" }}
          />
          <h1 className="Header"> Bundle Budgeting </h1>
        </div>
      </div>
    );
  }
}
