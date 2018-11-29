import React, { Component } from "react";
import {
  FormGroup,
  /* ControlLabel,
  FormControl,
  HelpBlock,*/
  Checkbox,
  Radio,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Survey.css";
import ResultList from "../ResultList/ResultList";

/*
Author: Eunice Hew
Survey to generate travel results list
*/

class Survey extends Component {
  //Climate, start/end dates, price, food,  flightprice, tripcost, population, bars, events, attractions, distance

  constructor(props, context) {
    super(props, context);

    this.state = {
      submit: false,
      startDate: new Date(),
      endDate: new Date(),
      distance: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  render() {
    let modal;
    if (this.state.submit) {
      modal = <ResultList />;
    }
    return (
      <Grid>
        <Row className="survey-body">
          <Col xs={12} md={12}>
            <h1 className="head">Travel Survey</h1>
            <form className="survey">
              <div className="column left">
                <p>What date range would you like travel?</p>
                Depart:{" "}
                <DatePicker
                  name="startDate"
                  selected={this.state.startDate}
                  onChange={e => this.handleStartChange(e)}
                />{" "}
                <br /> <br />
                Return:{" "}
                <DatePicker
                  name="endDate"
                  selected={this.state.endDate}
                  onChange={e => this.handleEndChange(e)}
                />{" "}
                <FormGroup>
                  <p>What distance would you like to travel?</p>
                  <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>
                  <Checkbox inline>3</Checkbox> <Checkbox inline>4</Checkbox>
                  <Checkbox inline>5</Checkbox>
                </FormGroup>
                <FormGroup>
                  <p>What temperature range would you like (Farenheit)?</p>
                  <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>
                  <Checkbox inline>3</Checkbox> <Checkbox inline>4</Checkbox>
                  <Checkbox inline>5</Checkbox>
                </FormGroup>{" "}
                <p>How much is your budget?</p>
                <FormGroup className="pics">
                  {" "}
                  <Radio name="radioGroup" inline>
                    <img
                      className="Pikachu"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRxn30r2ij1733AKJkUKK20YnSiWN-XjZFEeNvR8TQbpRAkjtjw"
                      alt="Pikachu"
                    />
                  </Radio>{" "}
                  <Radio name="radioGroup" inline>
                    <img
                      className="Pikachu"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRxn30r2ij1733AKJkUKK20YnSiWN-XjZFEeNvR8TQbpRAkjtjw"
                      alt="Pikachu"
                    />
                  </Radio>{" "}
                  <Radio name="radioGroup" inline>
                    <img
                      className="Pikachu"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRxn30r2ij1733AKJkUKK20YnSiWN-XjZFEeNvR8TQbpRAkjtjw"
                      alt="Pikachu"
                    />
                  </Radio>
                  <Radio name="radioGroup" inline>
                    <img
                      className="Pikachu"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRxn30r2ij1733AKJkUKK20YnSiWN-XjZFEeNvR8TQbpRAkjtjw"
                      alt="Pikachu"
                    />
                  </Radio>{" "}
                  <Radio name="radioGroup" inline>
                    <img
                      className="Pikachu"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRxn30r2ij1733AKJkUKK20YnSiWN-XjZFEeNvR8TQbpRAkjtjw"
                      alt="Pikachu"
                    />
                  </Radio>{" "}
                </FormGroup>{" "}
              </div>

              <div className="column right">
                <FormGroup>
                  <p>
                    Would you like to travel somewhere urban, suburban, or
                    rural?
                  </p>
                  <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>
                  <Checkbox inline>3</Checkbox> <Checkbox inline>4</Checkbox>
                  <Checkbox inline>5</Checkbox>
                </FormGroup>
                <FormGroup>
                  <p>What kinds of events do you like?</p>
                  <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>
                  <Checkbox inline>3</Checkbox> <Checkbox inline>4</Checkbox>
                  <Checkbox inline>5</Checkbox>
                </FormGroup>
                <FormGroup>
                  <p>What kinds of attractions would you like to see?</p>
                  <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>
                  <Checkbox inline>3</Checkbox> <Checkbox inline>4</Checkbox>
                  <Checkbox inline>5</Checkbox>
                </FormGroup>{" "}
              </div>
            </form>
            <div className="survey-button">
              <input
                className="button"
                type="submit"
                value="Submit"
                onClick={e => this.onClickSubmit(e)} //change to onSubmit when ready
              />
            </div>
            <br />
            <div className="Mod">{modal}</div>
          </Col>
        </Row>
      </Grid>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleStartChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleEndChange(date) {
    this.setState({
      endDate: date
    });
  }
  onClickSubmit(e) {
    this.setState({ submit: true });
  }

  submit(e) {
    e.preventDefault();
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace("/ResultList");
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true });
      });
  }
  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("SurveyBg");
  };
}
export default Survey;
