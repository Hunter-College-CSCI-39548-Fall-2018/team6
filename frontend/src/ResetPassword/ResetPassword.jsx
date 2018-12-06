import React, { Component } from "react";
import "../Login/Login.css";
import AuthService from "../AuthService/AuthService";
import queryString from "query-string";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      reenterPass: "",
      token: "",
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.Auth = new AuthService();
  }

  render() {
    let submit;
    let errorMessage;

    if (this.state.password !== this.state.reenterPass) {
      submit = (
        <div>
          <input
            className="button"
            type="submit"
            value="Reset Password"
            disabled
          />
          <p style={{ color: "red", fontSize: "15px" }}>
            Passwords do not match
          </p>
        </div>
      );
    } else {
      submit = (
        <input className="button" type="submit" value="Reset Password" />
      );
    }
    if (this.state.hasError) {
      errorMessage = (
        <p style={{ color: "red", fontSize: "15px" }}>
          Error in password reset. Try again.
        </p>
      );
    }
    return (
      <div className="Login">
        <div className="Header">
          <h1>Travel App </h1>
        </div>
        <h3> Password Reset </h3>

        <form onSubmit={e => this.submit(e)}>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              size="25"
              required
              onChange={e => this.handleChange(e)}
            />
            <br />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="reenterPass"
              placeholder="Re-enter Password"
              size="25"
              required
              onChange={e => this.handleChange(e)}
            />
            <br />
          </div>
          {submit}
          {errorMessage}
          <br />
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    this.Auth.resetPassword(
      this.state.email,
      this.state.token,
      this.state.password
    )
      .then(_res => {
        this.props.history.replace("/login");
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true });
      });
  }

  componentWillMount = () => {
    const values = queryString.parse(this.props.location.search);
    console.log("Email: " + values.email);
    console.log("Token: " + values.token);
    this.setState({ email: values.email, token: values.token });
    document.body.classList.add("LoginBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("LoginBg");
  };
}
export default ResetPassword;
