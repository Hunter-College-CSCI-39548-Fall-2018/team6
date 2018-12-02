import React, { Component } from "react";
import "./ResultList.css";
import { ListGroupItem, Media } from "react-bootstrap";
import Result from "../Result/Result";
// import { Link } from "react-router-dom";
import axios from "axios";

/*
Author: Eunice Hew
Results modul generated from survey
*/

class RenderResult extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      results: this.props.jsonResults,
      ext: [
        {
          id: "1",
          state: "NY",
          city: "Elm",
          population: "pop 10000",
          price: "$$",
          climate: "Warm",
          attractions: "No attractions",
          events: "No events",
          resturants: "No food",
          bars: "No bars"
        }
      ]
    };
    this.getExtendedResults = this.getExtendedResults.bind(this);
    this.loadResult = this.loadResult.bind(this);
  }
  render() {
    return <div>{this.forLoopResults()}</div>;
  }
  forLoopResults() {
    const resultList = [];
    for (let i = 0; i < this.state.results.length; i++) {
      resultList.push(
        <ListGroupItem className="Result" onClick={this.loadResult}>
          <Media>
            <Media.Left align="middle">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRxn30r2ij1733AKJkUKK20YnSiWN-XjZFEeNvR8TQbpRAkjtjw"
                alt="Pikachu"
              />
            </Media.Left>
            <Media.Body>
              <Media.Heading>Pikachu</Media.Heading>
              <p>
                Result #: {this.state.results[i].id} <br />
                State: {this.state.results[i].state} <br />
                City: {this.state.results[i].city} <br />
                Population: {this.state.results[i].population} <br />
                Price: {this.state.results[i].price} <br />
                Climate: {this.state.results[i].climate} <br />
              </p>
            </Media.Body>
          </Media>
        </ListGroupItem>
      );
    }
    return resultList;
  }

  getExtendedResults() {
    return axios
      .post("/getExtendedResults", {
        id: this.state.id
      })
      .then(function(response) {
        console.log(response);
        // this.setState({ ext: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  loadResult() {
    this.getExtendedResults();
    return <Result extResults={this.state.ext} />;
  }

  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    // document.body.classList.remove("SurveyBg");
  };
}

export default RenderResult;
