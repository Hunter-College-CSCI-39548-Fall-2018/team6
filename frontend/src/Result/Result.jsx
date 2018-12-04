import React, { Component } from "react";
// import "./Result.css";
import "../ResultList/ResultList.css";
import { Media, ListGroupItem, Tabs, Tab } from "react-bootstrap";

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
      <div style={{ marginLeft: "5%" }}>
        <Media className="Result">
          <Media.Left align="middle">
            <img
              src={this.state.result.city_img}
              alt="Pikachu"
              className="ResultImg"
            />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              {this.state.result.city_name}, {this.state.result.state_name}
            </Media.Heading>
            <Media.Left align="middle">
              <p>
                Rank: {this.state.result.rank} <br />
                State: {this.state.result.state_name} <br />
                City: {this.state.result.city_name} <br />
                Price Point: {this.state.result.cost_index}/4 <br />
                High temperature (F): {this.state.result.high} <br />
                Low temperature (F): {this.state.result.low} <br />
                Annual Precipitation (in):
                {this.state.result.annual_precipitation} <br />
              </p>
            </Media.Left>
          </Media.Body>
        </Media>
        <Media>
          <Media.Body>
            <p>
              Average Flight Cost: {this.state.result.flight_cost} <br />
              Nearby Airports: {this.forLoopAirports()} <br />
              Annual Passengers: {this.state.result.passengers} <br />
              Population: {this.state.result.population} <br />
              Density of population: {this.state.result.density}
              <br />
              How busy the airport is: {this.state.result.busy} <br />
            </p>
          </Media.Body>
        </Media>{" "}
        <h4 style={{ textAlign: "center" }}>
          <strong>Most popular via Yelp</strong>
        </h4>
        <Tabs>
          <Tab eventKey={1} title="Resturants">
            {this.forLoopYelp(this.state.result.yelp_restaurants)}
          </Tab>
          <Tab eventKey={2} title="Tours">
            {this.forLoopYelp(this.state.result.yelp_tours)}
          </Tab>
          <Tab eventKey={3} title="Bars">
            {this.forLoopYelp(this.state.result.yelp_bars)}
          </Tab>
          <Tab eventKey={4} title="Landmarks">
            {this.forLoopYelp(this.state.result.yelp_landmarks)}
          </Tab>
          <Tab eventKey={5} title="Hotels">
            {this.forLoopYelp(this.state.result.yelp_hotels)}
          </Tab>
        </Tabs>
      </div>
    );
  }

  forLoopAirports() {
    const resultAirports = [];
    for (let i = 0; i < this.state.result.nearby_airports.length; i++) {
      resultAirports.push(
        <p style={{ display: "inline" }}>
          {this.state.result.nearby_airports[i].airport_name},{" "}
          {this.state.result.nearby_airports[i].airport_code}
        </p>
      );
    }
    return resultAirports;
  }
  forLoopYelp(type) {
    const resultYelp = [];
    for (let i = 0; i < type.length; i++) {
      resultYelp.push(
        <ListGroupItem href={type[i].page_url}>
          <Media>
            <Media.Left>
              <img src={type[i].image_url} alt="pic" className="YelpImg" />
            </Media.Left>
            <Media.Body>
              <p>
                <ul>Name: {type[i].name}</ul>
                <ul>Review Count: {type[i].review_count}</ul>
                <ul>Review Score: {type[i].review_score}</ul>
              </p>
            </Media.Body>
          </Media>
        </ListGroupItem>
      );
    }
    return resultYelp;
  }

  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    // document.body.classList.remove("SurveyBg");
  };
}
export default Result;
