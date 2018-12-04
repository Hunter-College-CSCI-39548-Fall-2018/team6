import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ForgotPassword } from "../ForgotPassword";
import { Register } from "../Register";
import "./Login.css";
import AuthService from "../AuthService/AuthService";
import { Button, Glyphicon } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      reenterPass: "",
      isForgotPassword: false,
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.Auth = new AuthService();
  }

  render() {
    let login;
    let errorMessage;
    if (this.state.hasError) {
      errorMessage = (
        <p style={{ color: "red", fontSize: "15px" }}>
          Error in login. Try again.
        </p>
      );
    }
    if (this.state.isForgotPassword) {
      login = <ForgotPassword />;
    } else {
      login = (
        <div>
          <h3>Login</h3>
          <form onSubmit={e => this.submit(e)}>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                size="25"
                onChange={e => this.handleChange(e)}
                required
              />
              <br />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                size="25"
                onChange={e => this.handleChange(e)}
                required
              />
              <br />
            </div>
            <input className="button" type="submit" value="Login" />
            <br />
            <p
              onClick={e => this.OnClickForgotPassword(e)}
              className="Forgot-Password"
            >
              Forgot Password?
            </p>
          </form>
          {errorMessage}
        </div>
      );
    }

    return (
      <div className="Login">
        <div className="Header">
          <Button
            style={{
              position: "absolute",
              marginLeft: "100px",
              background: "none",
              border: "0px"
            }}
            href="/"
          >
            <Glyphicon glyph="glyphicon glyphicon-remove" />
          </Button>
          <h1>Travel App </h1>
        </div>
        <Tabs className="react-tabs">
          <TabList>
            <Tab onClick={e => this.OnClickShowLogin(e)}> Login</Tab>
            <Tab> Register</Tab>
          </TabList>
          <TabPanel>{login}</TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
        </Tabs>
        {/* <div className="jwt-icon" /> */}
      </div>
    );
  }

  OnClickForgotPassword(e) {
    this.setState({ isForgotPassword: !this.state.isForgotPassword });
  }

  OnClickShowLogin(e) {
    this.setState({ isForgotPassword: false });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace("/home");
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true });
      });
  }

  componentWillMount = () => {
    if (this.Auth.loggedIn()) {
      this.props.history.replace("/home");
    }
    document.body.classList.add("LoginBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("LoginBg");
  };
}
export default Login;
