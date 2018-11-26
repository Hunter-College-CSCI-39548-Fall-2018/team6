import React, { Component } from "react";
import {
  FormGroup,
  /* ControlLabel,
  FormControl,
  HelpBlock,*/
  Checkbox,
  Radio
} from "react-bootstrap";
import axios from "axios";
import "./Survey.css";

class Survey extends Component {
  //Climate, distance, price, population

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <form>
        <h1>Travel Survey</h1>
        <FormGroup>
          <p>What would you like to do?</p>
          <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>
          <Checkbox inline>3</Checkbox> <Checkbox inline>4</Checkbox>
          <Checkbox inline>5</Checkbox>
        </FormGroup>
        <FormGroup>
          {" "}
          How much do you like cities?
          <Radio name="radioGroup" inline>
            1
          </Radio>{" "}
          <Radio name="radioGroup" inline>
            2
          </Radio>{" "}
          <Radio name="radioGroup" inline>
            3
          </Radio>
          <Radio name="radioGroup" inline>
            4
          </Radio>{" "}
          <Radio name="radioGroup" inline>
            5
          </Radio>{" "}
        </FormGroup>{" "}
        <div className="form-buttom">
          <input className="button" type="submit" value="Submit" />
        </div>
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
    axios.post("/getToken", {
      // username: this.state.username,
      // password: this.state.password
    });
    // .then(res => localStorage.setItem("cool-jwt", res.data));
  }
  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("SurveyBg");
  };
}
export default Survey;
