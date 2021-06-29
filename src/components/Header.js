import React, { Component } from "react";

import Navbar from 'react-bootstrap/Navbar';
import "../App.css";
import navicon from "../navicon.png";
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
          <Navbar.Brand href="#home">Bundle Budgeting</Navbar.Brand>
        </Navbar>
      </div >
    );
  }
}
