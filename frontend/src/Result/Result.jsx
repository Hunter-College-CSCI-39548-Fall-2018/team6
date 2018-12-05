import React from "react";
import axios from "axios";

import "../ResultList";
//const BrowserHistory = require("react-router/lib/BrowserHistory").default;

/*
Topgyal Gurung
Result PAGE 

Status: 
TODO: 
React component for when we have API
  1.  GET Request:
        Sliders: {
        // out of 10
        Climate: 7
        Cost: 5
    }
    Response:
        Results: [{
        CityName: ,
        StateName: ,
        AveragePrice: , 
    }]
     Sample JSON response
        {
        CityName: "New York City",
        StateName: "New York",
        Weather: [
            high: 80
            low: 40
            ],
        Cost: "$",
        // Links
        TopBars: []
        // Links
        TopRestaurants: []
        NearbyAirports: [
            "JFK", "LGA", "" // NEWARK],
        Picture: URL // asset link} 

       2.  Back Button: need to figure out how to go back to Result List
       3. Need to render image 
      4.Show the info:
*/
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      items: [],
      isLoaded: false
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }
  handleBack = () => {
    this.props.history.push("/ResultList");
  };
  //method runs after render and updates render method
  componentDidMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/adrian-stru/travel-filters/master/DATA/json/attractions.json?token=ARfVeQkcPKWc6HCyHfODTXWdxAkqGqebks5cCgdfwA%3D%3D"
      ) //url of api
      .then(res => {
        const cityInfo = res.data.map(c => {
          return {
            city: c.city,
            state: c.state,
            Weather: c.weather,
            cost: c.cost,
            TopBars: c.TopBars,
            TopRestaurants: c.TopRestaurants,
            NearbyAirports: c.NearbyAirports
            // picture: c.picture
          };
        });
        const newState = Object.assign({}, this.state, {
          cityInformation: cityInfo
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="main">
        <div className="back-button">
          <button onClick={this.handleBack} bsStyle="success">
            &lt;Back
          </button>
        </div>
        <div className="cityInfo">
          <h1> Milan Italy </h1>
          <img
            src="https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/019/956/large/6f352d7756d5b92c83239c10f9a394e6/italy-milan-galleria-vittorio-emanuel.jpg"
            alt="new"
          />
          <br />
        </div>
        <div className="Info" />
        <h1 className="title-container__title">
          You searched for a destination that fits this profile:
        </h1>
        <h3 className="title-container__subtitle">
          Historical: {this.state.alias}
        </h3>
        <h3 className="title-container_subtitle">
          Walkable:{this.state.distance}
        </h3>
        <h3 className="title-container_subtitle">
          Many attractions:{this.state.name}
        </h3>

        <hr />

        <h1 className="title-container__title">Info: </h1>
        <h3 className="title-container__subtitle">Cost: </h3>
        <h3 className="title-container_subtitle">Weather:</h3>
        <h3 className="title-container_subtitle">Attractions:</h3>
      </div>
    );
  }
}
export default Result;
