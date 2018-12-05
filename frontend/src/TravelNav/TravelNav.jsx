import React, { Component } from "react";
import "./TravelNav.css";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import AuthService from "../AuthService/AuthService";
const Auth = new AuthService();

class TravelNav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoggedIn: this.props.loggedIn
      // isLoggedIn: true
    };
  }
  render() {
    console.log("Travel auth: " + this.state.isLoggedIn);
    let logstate;
    if (this.state.isLoggedIn) {
      logstate = (
        <div>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home">Travel App</a>
              <img
                src="http://www.crdfglobal.org/sites/default/files/styles/square/public/capabilities/Travel%20Coordination.png?itok=qeIxjq8h"
                alt="logo"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "80px",
                  marginTop: "-20px"
                }}
              />
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/survey">
              Survey
            </NavItem>
            <NavItem eventKey={2} href="/history">
              History
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem
              eventKey={3}
              href="/"
              onClick={this.handleLogout.bind(this)}
            >
              Logout
            </NavItem>
          </Nav>
        </div>
      );
    } else {
      logstate = (
        <div>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Travel App</a>
              <img
                src="http://www.crdfglobal.org/sites/default/files/styles/square/public/capabilities/Travel%20Coordination.png?itok=qeIxjq8h"
                alt="logo"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "80px",
                  marginTop: "-20px"
                }}
              />
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={3} href="/login">
              Login
            </NavItem>
          </Nav>{" "}
        </div>
      );
    }
    return (
      <div className="TravelNav">
        <Navbar>{logstate}</Navbar>
      </div>
    );
  }

  handleLogout() {
    Auth.logout();
    this.setState({ isLoggedIn: false });
    this.props.history.replace("/");
  }
}
export default TravelNav;
