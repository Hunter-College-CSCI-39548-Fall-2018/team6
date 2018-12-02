import React, { Component } from "react";
import "./History.css";
import ResultList from "../ResultList/ResultList";
import { ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import axios from "axios";

class History extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      timestamp: ["1PM", "2PM", "3PM"]
    };
  }
  render() {
    let results;
    if (this.state.timestamp.length === 0) {
      results = <h1 style={{ textAlign: "center" }}>There are no results.</h1>;
    } else {
      results = (
        <Grid className="History">
          <Row>
            <h3>List of destinations</h3>
            {this.forLoopTimestamps()}
          </Row>
        </Grid>
      );
    }
    return <div>{results}</div>;
  }

  forLoopTimestamps() {
    const historyList = [];
    for (let i = 0; i < this.state.timestamp.length; i++) {
      historyList.push(
        <Col xs={8} md={8} key={this.state.timestamp[i]}>
          <ListGroupItem className="HistoryResult">
            Timestamp: {this.state.timestamp[i]} <br />
            <ResultList ts={this.state.timestamp[i]} />
          </ListGroupItem>
        </Col>
      );
    }
    return historyList;
  }

  getTimestamps() {
    return axios
      .get("/getTimestamps")
      .then(function(response) {
        console.log(response.data);
        this.setState({ timestamp: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount = () => {
    this.getTimestamps();
    // document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    // document.body.classList.remove("SurveyBg");
  };
}
export default History;
