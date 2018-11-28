import React, { Component } from "react";
// import axios from "axios";
import AuthService from "../AuthService/AuthService";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      hasError: false
    };
    this.Auth = new AuthService();
  }
  render() {
    let errorMessage;
    if (this.state.hasError) {
      errorMessage = (
        <p style={{ color: "red", fontSize: "15px" }}>
          Email not found. Try again.
        </p>
      );
    }
    return (
      <form onSubmit={e => this.submit(e)}>
        <h3>Password Reset</h3>
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
        {errorMessage}
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
      .then(res => {
        this.props.history.replace("/Login");
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true });
      });
  }
  /*submit(e) {
    e.preventDefault();
    axios
      .post("/sendForgetPasswordEmail", {
        email: this.state.email
      })
      .then(res => {
        localStorage.setItem("cool-jwt", res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true });
      });
  }*/
}

export default ForgotPassword;