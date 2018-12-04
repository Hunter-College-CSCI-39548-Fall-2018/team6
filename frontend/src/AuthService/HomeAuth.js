import React, { Component } from "react";
import AuthService from "./AuthService";

/*
Author: Eunice Hew
Authorization for home 
*/

export default function homeAuth(AuthComponent) {
  const Auth = new AuthService("http://localhost:8080");
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
        isAuthed: false
      };
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.setState({ isAuthed: false });
        this.props.history.replace("/");
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile,
            isAuthed: true
          });
        } catch (err) {
          Auth.logout();
          this.props.history.replace("/Login");
        }
      }
    }
    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      } else {
        return null;
      }
    }
  };
}
