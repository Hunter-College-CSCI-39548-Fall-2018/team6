import React, { Component } from "react";
import AuthService from "../AuthService/AuthService";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      hasError: false,
      sent: false
    };
    this.Auth = new AuthService();
  }
  render() {
    let message;
    if (this.state.hasError) {
      message = (
        <p style={{ color: "red", fontSize: "15px" }}>
          Email not found. Try again.
        </p>
      );
    }
    if (this.state.sent) {
      message = <p style={{ fontSize: "15px" }}>An email will be sent soon.</p>;
    }
    return (
      <form onSubmit={e => this.submit(e)}>
        <h3>Password Reset</h3>
        <br />
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            size="25"
            required
            onChange={e => this.handleChange(e)}
          />
          <br />
        </div>
        <input className="button" type="submit" value="Submit" />
        <br />
        {message}
      </form>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submit(e) {
    e.preventDefault();
    this.Auth.forgotPassword(this.state.email)
      .then(_res => {
        this.setState({ sent: true });
        this.props.history.replace("/login");
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true });
      });
  }
}

export default ForgotPassword;
