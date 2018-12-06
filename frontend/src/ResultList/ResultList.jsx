import React, { Component } from "react";
import "./ResultList.css";
import RenderResult from "./RenderResult";
import { Button, Modal, ListGroup } from "react-bootstrap";
import axios from "axios";
import AuthService from "../AuthService/AuthService";

class ResultList extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.getResultsFromSurveyChoices = this.getResultsFromSurveyChoices.bind(
      this
    );
    this.successHandler = this.successHandler.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.Auth = new AuthService();
    this.state = {
      show: false,
      save: this.props.save,
      survey: this.props.ts,
      cities: [
        {
          city_name: "",
          state_name: "",
          city_img: "",
          population: null,
          cost_index: null,
          high: null,
          low: null,
          busy: null,
          density: null,
          score: null
        }
      ]
    };
  }
  render() {
    return (
      <div className="Result-list">
        <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
          Launch survey results
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Travel Survey Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup className="List">
              <RenderResult jsonResults={this.state.cities} />
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  async getResultsFromSurveyChoices() {
    let config = {
      headers: {
        Authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };

    let payload = this.state.survey;
    payload["save"] = this.props.save;

    return (
      axios
        // .post("http://localhost:5000/v1/survey", payload, config)
        .post("http://104.248.233.14:5000/v1/survey", payload, config)
        .then(response => {
          this.successHandler(response.data);
        })
        .catch(function(error) {
          console.log(error);
        })
    );
  }

  successHandler(data) {
    this.setState({ cities: data });
    console.log("+_____+");
    console.log("Success cities: " + this.state.cities);
  }

  handleClose() {
    this.setState({ show: false });
    // return <Link to="/survey" />;
    // return <Redirect push to="/login" />;
  }

  async handleShow() {
    await this.getResultsFromSurveyChoices();
    this.setState({ show: true });
  }
  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("SurveyBg");
  };
}

export default ResultList;
