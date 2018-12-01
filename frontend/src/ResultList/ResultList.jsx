import React, { Component } from "react";
import "./ResultList.css";
import RenderResult from "./RenderResult";
import { Button, Modal, ListGroup } from "react-bootstrap";
// import { Redirect, Link } from "react-router-dom";

/*
Author: Eunice Hew
Results modul generated from survey
*/

class ResultList extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false
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
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Travel Survey Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>List of destinations</h3>
            <ListGroup className="List">
              <RenderResult />
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} href="/History">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  handleClose() {
    this.setState({ show: false });
    // return <Link to="/login" />;
    // return <Redirect to="/login" />;
  }

  handleShow() {
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
