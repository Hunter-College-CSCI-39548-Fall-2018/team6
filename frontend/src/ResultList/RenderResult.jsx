import React, { Component } from "react";
import "./ResultList.css";
import { ListGroupItem, Media } from "react-bootstrap";

/*
Author: Eunice Hew
Results modul generated from survey
*/

class RenderResult extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      state: "NY",
      city: "Elm",
      population: "pop 10000",
      price: "$$",
      climate: "Warm"
    };
  }
  render(match) {
    return (
      <div>
        <ListGroupItem className="Result" href="/Result">
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
                State: {this.state.state} <br />
                City: {this.state.city} <br />
                Population: {this.state.population} <br />
                Price: {this.state.price} <br />
                Climate: {this.state.climate} <br />
              </p>
            </Media.Body>
          </Media>
        </ListGroupItem>
        <ListGroupItem className="Result" href="/Result">
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
                State: {this.state.state} <br />
                City: {this.state.city} <br />
                Population: {this.state.population} <br />
                Price: {this.state.price} <br />
                Climate: {this.state.climate} <br />
              </p>
            </Media.Body>
          </Media>
        </ListGroupItem>
      </div>
    );
  }

  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    // document.body.classList.remove("SurveyBg");
  };
}

export default RenderResult;
