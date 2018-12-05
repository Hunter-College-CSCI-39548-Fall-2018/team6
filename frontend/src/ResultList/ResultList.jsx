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
    this.handleClose = this.handleClose.bind(this);
    this.Auth = new AuthService();
    this.state = {
      show: false,
      survey: this.props.ts,
      cities: [
        {
          city_name: "Baton Rouge",
          state_name: "Louisiana",
          population: 226505,
          cost_index: 2,
          high: 81.7,
          low: 50.1,
          busy: 5,
          density: 1017.8673,
          score: 205
        },
        {
          city_name: "Atlanta",
          state_name: "Georgia",
          population: 491626,
          cost_index: 2,
          high: 80.0,
          low: 42.7,
          busy: 1,
          density: 1422.5653,
          score: 204
        },
        {
          city_name: "Miami",
          state_name: "Florida",
          population: 479009,
          cost_index: 1,
          high: 83.7,
          low: 68.1,
          busy: 1,
          density: 5139.2676,
          score: 187
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
  getResultsFromSurveyChoices() {
    let config = {
      headers: {
        Authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    return axios
      .post(
        "http://localhost:5000/v1/survey/",
        {
          cities: this.state.survey
        },
        config
      )
      .then(function(response) {
        console.log(response);
        // this.setState({ cities: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClose() {
    this.setState({ show: false });
    // return <Link to="/survey" />;
    // return <Redirect push to="/login" />;
  }

  handleShow() {
    this.getResultsFromSurveyChoices();
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
