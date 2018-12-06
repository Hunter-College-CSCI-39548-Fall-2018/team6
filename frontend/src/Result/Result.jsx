import React, { Component } from "react";
import "../ResultList/ResultList.css";
import { Media, ListGroupItem, Tabs, Tab } from "react-bootstrap";
// import withAuth from "../AuthService/WithAuth";
// import AuthService from "../AuthService/AuthService";
// import axios from "axios";

class Result extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      result: this.props.extResults,
      test: false
    };
    // this.Auth = new AuthService();
  }

  render() {
    return (
      <div style={{ marginLeft: "5%" }}>
        <Media className="Result">
          <Media.Left align="middle">
            <img
              // src="https://picsum.photos/200"
              src={this.state.result.city_img}
              // src="http://localhost:5000/v1/city_img/"+{this.state.result.city_name}
              alt="City"
              className="ResultImg"
            />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              {this.state.result.city_name}, {this.state.result.state_name}
            </Media.Heading>
            <Media.Left align="middle">
              <p>
                {/* Rank: {this.state.result.rank} <br /> */}
                State: {this.state.result.state_name} <br />
                City: {this.state.result.city_name} <br />
                Population: {this.state.result.population} <br />
                How busy it is: {this.state.result.busy} <br />
                High temperature (F): {this.state.result.high} <br />
                Low temperature (F): {this.state.result.low} <br />
              </p>
            </Media.Left>
          </Media.Body>
        </Media>
        <Media>
          <Media.Body>
            <p>
              Annual Precipitation (in):
              {this.state.result.annual_precipitation} <br />
              How pricy: {this.state.result.cost_index}/4 <br />
              Average Flight Cost: {this.state.result.flight_cost} <br />
              Nearest Airport: {this.state.result.airport_name},{" "}
              {this.state.result.airport_code} <br />
              Annual Passengers: {this.state.result.annual_passengers} <br />
              Small or big city: {this.state.result.density}
              <br />
            </p>
          </Media.Body>
        </Media>{" "}
        <h4 style={{ textAlign: "center" }}>
          <strong>Most popular via Yelp</strong>
        </h4>
        <Tabs id="tabs">
          <Tab eventKey={1} title="Restaurants">
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

  forLoopYelp(type) {
    const resultYelp = [];
    for (let i = 0; i < type.length; i++) {
      resultYelp.push(
        <ListGroupItem href={type[i].page_url} key={i}>
          <Media>
            <Media.Left>
              <img src={type[i].image_url} alt="pic" className="YelpImg" />
            </Media.Left>
            <Media.Body>
              <span>
                <ul>Name: {type[i].name}</ul>
                <ul>Review Count: {type[i].review_count}</ul>
                <ul>Review Score: {type[i].review_score}</ul>
              </span>
            </Media.Body>
          </Media>
        </ListGroupItem>
      );
    }
    if (resultYelp.length === 0) {
      resultYelp.push(
        <span key={0}>
          <br />
          There are no corresponding results.
        </span>
      );
    }
    return resultYelp;
  }

  // getTest() {
  //   let config = {
  //     headers: {
  //       Authorization: this.Auth.getToken(),
  //       "Content-Type": "application/json"
  //     }
  //   };
  //   let payload = {
  //     save: !!this.props.test ? this.props.test : false
  //   };
  //   return axios
  //     .post("http://localhost:5000/v1/survey/", payload, config)
  //     .then(function(response) {
  //       console.log(response);
  //       this.setState({ save: response.data });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  componentWillMount = () => {
    document.body.classList.add("SurveyBg");
  };

  componentWillUnmount = () => {
    // document.body.classList.remove("SurveyBg");
  };
}
export default Result;
// export default withAuth(Result);
