import React, { Component } from "react";
import AuthService from "./AuthService";

export default function homeAuth(AuthComponent) {
  const Auth = new AuthService("http://localhost:5000");
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
        isAuthed: undefined
      };
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.setState({ isAuthed: false });
        // this.props.history.replace("/login");
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile,
            isAuthed: true
          });
        } catch (err) {
          Auth.logout();
          this.props.history.replace("/login");
        }
      }
    }
    render() {
      if (this.state.user) {
        return (
          <AuthComponent
            history={this.props.history}
            user={this.state.user}
            isAuthed={this.state.isAuthed}
          />
        );
      } else {
        return null;
      }
    }
  };
}
