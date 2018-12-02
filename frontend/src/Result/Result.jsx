import React, { Component } from "react";
// import "./Result.css";
import "../ResultList/ResultList.css";
import { Media } from "react-bootstrap";

/*
Author: Eunice Hew
Results modul generated from survey
*/

class Result extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      state: "NY",
      city: "Elm",
      population: "pop 10000",
      price: "$$",
      climate: "Warm",
      attractions: "No attractions",
      events: "No events",
      resturants: "No food",
      bars: "No bars"
    };
  }
  render() {
    return (
      <Media className="Result" style={{ marginLeft: "5%" }}>
        <Media.Left align="middle">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRxn30r2ij1733AKJkUKK20YnSiWN-XjZFEeNvR8TQbpRAkjtjw"
            alt="Pikachu"
          />
        </Media.Left>
        <Media.Body>
          <Media.Heading>Pikachu</Media.Heading>
          <Media.Left align="middle">
            <p>
              State: {this.state.state} <br />
              City: {this.state.city} <br />
              Population: {this.state.population} <br />
              Price: {this.state.price} <br />
              Climate: {this.state.climate} <br />
            </p>
          </Media.Left>
          <Media.Left align="middle">
            <p>
              Attractions: {this.state.attractions} <br />
              Events: {this.state.events} <br />
              Resturants: {this.state.resturants} <br />
              Bars: {this.state.bars} <br />
            </p>
          </Media.Left>
        </Media.Body>
      </Media>
    );
  }

  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("SurveyBg");
  };
}
export default Result;
