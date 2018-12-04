import React, { Component } from "react";
import "./ResultList.css";
import RenderResult from "./RenderResult";
import { Button, Modal, ListGroup } from "react-bootstrap";
import axios from "axios";

/*
Author: Eunice Hew
Results modul generated from survey
*/

class ResultList extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.getResultsFromSurveyChoices = this.getResultsFromSurveyChoices.bind(
      this
    );
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      survey: this.props.ts,
      cities: [
        {
          city_name: "Corkish",
          state_name: "Fallon",
          city_img: "https://picsum.photos/200",
          population: 50000,
          cost_index: 3,
          high: 90,
          low: 50,
          busy: 3,
          density: 5,
          rank: 1
        },
        {
          city_name: "Probin",
          state_name: "Stan",
          city_img: "https://picsum.photos/200/300/?random",
          population: 20000,
          cost_index: 2,
          high: 80,
          low: 40,
          busy: 2,
          density: 4,
          rank: 3
        },
        {
          city_name: "Paeckmeyer",
          state_name: "NOT PIKACHU",
          city_img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRxn30r2ij1733AKJkUKK20YnSiWN-XjZFEeNvR8TQbpRAkjtjw",
          population: 12345678,
          cost_index: 3,
          high: 50,
          low: 30,
          busy: 9,
          density: 4,
          rank: 9
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
    return axios
      .post("/getHistoryFromSurveyChoices", {
        cities: this.state.survey
      })
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
    // return <Link to="/Survey" />;
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
