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
  render() {
    return (
      <div className="TravelNav">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>Travel App</Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/Survey">
              Survey
            </NavItem>
            <NavItem eventKey={2} href="/History">
              History
            </NavItem>
            {/* </NavItem eventKey={3} href="/ResultList">
            ResultList
            </NavItem>
           */}
            <NavItem eventKey={4} href="/ResultList">
              ResultList
            </NavItem>
            <NavItem eventKey={5} href="/Result">
              Result
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem
              eventKey={3}
              href="/Login"
              onClick={this.handleLogout.bind(this)}
            >
              Logout
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
  handleLogout() {
    Auth.logout();
    this.props.history.replace("/login");
  }
}
export default TravelNav;
