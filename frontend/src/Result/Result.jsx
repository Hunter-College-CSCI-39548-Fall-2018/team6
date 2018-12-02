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
      result: this.props.extResults
    };
  }
  render() {
    return (
      <Media className="Result" style={{ marginLeft: "5%" }}>
        <Media.Left align="middle">
          <img src={this.state.result.imageUrl} alt="Pikachu" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            {this.state.result.city}, {this.state.result.state}
          </Media.Heading>
          <Media.Left align="middle">
            <p>
              ID: {this.state.result.id} <br />
              State: {this.state.result.state} <br />
              City: {this.state.result.city} <br />
              Population: {this.state.result.population} <br />
              Price: {this.state.result.price} <br />
              Climate: {this.state.result.climate} <br />
            </p>
          </Media.Left>
          <Media.Left align="middle">
            <p>
              Attractions: {this.state.result.attractions} <br />
              Events: {this.state.result.events} <br />
              Resturants: {this.state.result.resturants} <br />
              Bars: {this.state.result.bars} <br />
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
    // document.body.classList.remove("SurveyBg");
  };
}
export default Result;
