import React, { Component } from "react";
import "./ResultList.css";
import RenderResult from "./RenderResult";
import { Button, Modal, ListGroup } from "react-bootstrap";
import axios from "axios";
// import { Redirect, Link } from "react-router-dom";
// import { withRouter } from "react-router-dom";

/*
Author: Eunice Hew
Results modul generated from survey
*/

class ResultList extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.getResultsFromTimestamp = this.getResultsFromTimestamp.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      timestamp: this.props.ts,
      results: [
        {
          id: "1",
          state: "Fallon",
          city: "Corkish",
          population: "fcorkish0@uol.com.br",
          price: "Female",
          climate: "143.156.211.217"
        },
        {
          id: 2,
          state: "Stan",
          city: "Probin",
          population: "sprobin1@jiathis.com",
          price: "Male",
          climate: "115.255.246.218"
        },
        {
          id: 3,
          state: "NOT PIKACHU",
          city: "Paeckmeyer",
          population: "apaeckmeyer2@nature.com",
          price: "Female",
          climate: "12.240.105.10"
        }
      ]
      // clicked: false
    };
  }
  render() {
    // if (this.state.clicked && !this.state.show) {
    //   return <Link to="/login" />;
    // }
    return (
      <div className="Result-list">
        <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
          Launch survey results
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          onExit={this.exitFunc}
        >
          <Modal.Header closeButton>
            <Modal.Title>Travel Survey Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>List of destinations </h3>
            <ListGroup className="List">
              <RenderResult jsonResults={this.state.results} />
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  getResultsFromTimestamp() {
    return axios
      .post("/getHistoryFromTimestamp", {
        timestamp: this.state.timestamp
      })
      .then(function(response) {
        console.log(response);
        // this.setState({ results: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  exitFunc() {
    // e.preventDefault();
    console.log("Redirect?");
    // this.props.history.push("/History");
    // return <Redirect push to="/History" />;
  }
  handleClose() {
    this.setState({ show: false });
    // return <Link to="/Survey" />;
    // return <Redirect push to="/login" />;
  }

  handleShow() {
    this.getResultsFromTimestamp();
    this.setState({ show: true });
    // this.setState.clicked = true;
  }
  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("SurveyBg");
  };
}

export default ResultList;
