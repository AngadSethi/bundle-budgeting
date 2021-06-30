import React, { Component } from "react";

import Navbar from 'react-bootstrap/Navbar';
import "../App.css";
import SideBar from "./DrawerNavigation";
import 'bootstrap/dist/css/bootstrap.min.css'
export default class Header extends Component {
  render() {
    return (
      <div>
        {/* <img
          alt="navbar"
          src={navicon}
          style={{ display: "flex", width: "50px", height: "50px" }}
        /> */}
        <Navbar bg="primary" variant="dark" className="Navbar">
          <SideBar />
          <Navbar.Brand href="#home">Bundle Budgeting</Navbar.Brand>
        </Navbar>
      </div >
    );
  }
}
