import React, { Component } from "react";
import { FormGroup, Checkbox, Radio, Grid, Row, Col } from "react-bootstrap";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

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
      // show: false,
      submit: false,
      from: undefined,
      to: undefined,
      origin: "",
      distance: ""
    };

    this.submit = this.submit.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  render() {
    const marks = {
      0: (
        <img
          className="Pikachu"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRxn30r2ij1733AKJkUKK20YnSiWN-XjZFEeNvR8TQbpRAkjtjw"
          alt="Pikachu"
        />
      ),
      100: <strong>100</strong>
    };
    const today = new Date();
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

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
                <FormGroup>
                  <p>
                    What date range would you like travel (up to three months)?
                  </p>{" "}
                  <div className="InputFromTo">
                    <DayPickerInput
                      value={from}
                      placeholder="From"
                      format="LL"
                      formatDate={formatDate}
                      parseDate={parseDate}
                      dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: {
                          before: today,
                          after: to
                        },
                        toMonth: to,
                        modifiers,
                        numberOfMonths: 1,
                        onDayClick: () => this.to.getInput().focus()
                      }}
                      onDayChange={this.handleFromChange}
                    />{" "}
                    —{" "}
                    <span className="InputFromTo-to">
                      <DayPickerInput
                        ref={el => (this.to = el)}
                        value={to}
                        placeholder="To"
                        format="LL"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        dayPickerProps={{
                          selectedDays: [from, { from, to }],
                          disabledDays: {
                            before: !!from ? from : new Date()
                            // after: new Date(
                            //   until.setMonth(until.getMonth() + 3)
                            // )
                            // after: !!from
                            //   ? from.setMonth(from.getMonth() + 3)
                            //   : new Date()
                          },
                          modifiers,
                          month: from,
                          fromMonth: from,
                          numberOfMonths: 1
                        }}
                        onDayChange={this.handleToChange}
                      />
                    </span>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="slider">
                    <p>Slider with marks</p>
                    <Slider
                      min={0}
                      marks={marks}
                      included={false}
                      defaultValue={50}
                    />
                  </div>{" "}
                </FormGroup>
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

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    console.log("from :::", from);
  }
  handleToChange(to) {
    console.log(to);
    this.setState({ to }, this.showFromMonth);
  }

  onClickSubmit(e) {
    this.setState({ submit: true });
    // this.setState({ show: true });
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
