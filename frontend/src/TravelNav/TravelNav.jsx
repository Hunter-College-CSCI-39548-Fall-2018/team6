import React, { Component } from "react";
import "./TravelNav.css";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import AuthService from "../AuthService/AuthService";
const Auth = new AuthService();

/*
Author: Eunice Hew
Navigation bar containing links to survey, history, and logout
*/

class TravelNav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // isLoggedIn: this.props.isAuthed
      isLoggedIn: true
    };
  }
  render() {
    console.log(this.state.isLoggedIn);
    let logstate;
    if (this.state.isLoggedIn) {
      logstate = (
        <div>
          <Nav>
            <NavItem eventKey={1} href="/Survey">
              Survey
            </NavItem>
            <NavItem eventKey={2} href="/History">
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
        <Nav pullRight>
          <NavItem eventKey={3} href="/Login">
            Login
          </NavItem>
        </Nav>
      );
    }
    return (
      <div className="TravelNav">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Travel App</a>
            </Navbar.Brand>
          </Navbar.Header>
          {logstate}
        </Navbar>
      </div>
    );
  }

  handleLogout() {
    Auth.logout();
    this.setState({ isLoggedIn: false });
    this.props.history.replace("/Login");
  }
}
export default TravelNav;
