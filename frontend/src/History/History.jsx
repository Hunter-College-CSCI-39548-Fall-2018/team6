import React, { Component } from "react";
import "./History.css";
import ResultList from "../ResultList/ResultList";
import { ListGroupItem, Grid, Row, Col } from "react-bootstrap";

class History extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      timestamp: "1PM"
      // state: "",
      // city: "",
      // population: "",
      // price: "",
      // climate: ""
    };
  }
  render() {
    let results;
    if (this.state.timestamp === "") {
      results = <h1 style={{ textAlign: "center" }}>There are no results.</h1>;
    } else {
      results = (
        <Grid className="History">
          <Row>
            <h3>List of destinations</h3>
            <Col xs={8} md={8}>
              <ListGroupItem className="HistoryResult">
                Timestamp: {this.state.timestamp} <br />
                <ResultList />
              </ListGroupItem>{" "}
            </Col>
            <Col xs={8} md={8}>
              <ListGroupItem className="HistoryResult">
                Timestamp: {this.state.timestamp} <br />
                <ResultList />
              </ListGroupItem>
            </Col>
          </Row>
        </Grid>
      );
    }
    return <div>{results}</div>;
  }

  // rowStyleFormat(row, rowIdx) {
  //   return { backgroundColor: rowIdx % 2 === 0 ? 'rgb(235, 237, 238)' : 'white' };
  // }
}
export default History;
