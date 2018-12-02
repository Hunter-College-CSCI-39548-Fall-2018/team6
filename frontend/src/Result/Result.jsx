import React from "react";
import axios from "axios";

//const BrowserHistory = require("react-router/lib/BrowserHistory").default;
//import { Nav, Navbar, NavItem } from "react-bootstrap";
//import AuthService from "../AuthService/AuthService";
//const Auth = new AuthService();

/*
Topgyal Gurung
Result 

Status: Just getting city name List using API( can be useful for ResultList)
        Back Button: need to figure out how to go back to Result List
        Need to render image
        Show the info:
*/
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      items: [],
      isLoaded: false,

      cityName: "",
      stateName: "",
      Weather: [],
      cost: "",
      TopBars: [],
      TopRestaurants: [],
      NearbyAirports: [],
      picture: ""
      /*
      cost: undefined,
      temparature:undefined,
      attractions:undefined
      */
    };
    // this.goBack = this.goBack.bind(this);
  }
  //method runs after render and updates render method
  componentDidMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/adrian-stru/travel-filters/master/DATA/json/attractions.json?token=ARfVeQkcPKWc6HCyHfODTXWdxAkqGqebks5cCgdfwA%3D%3D"
      ) //url of api
      .then(res => {
        const cityInfo = res.data.map(c => {
          return {
            cityName: c.cityName,
            stateName: c.stateName,
            Weather: [],
            cost: c.cost,
            TopBars: [],
            TopRestaurants: [],
            NearbyAirports: [],
            picture: c.picture
          };
        });
        const newState = Object.assign({}, this.state, {
          cityInf: cityInfo
        });
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }
  render() {
    /*
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>loading..</div>;
    } else {
    */
    return (
      <div className="main">
        <div className="back-button">
          <button>Back</button>
        </div>
        <div className="cityInfo">
          <h1> Milan Italy </h1>
          <img
            src="https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/019/956/large/6f352d7756d5b92c83239c10f9a394e6/italy-milan-galleria-vittorio-emanuel.jpg"
            alt="new"
          />
          <br />
        </div>

        {/*.bind(this)*} 
             <button onClick={BrowserHistory.goBack}>Go Back</button>
              <button type="submit"> Back</button> </form> *}

            {/* get the asked city Name 
              {items.map(item => (
                <li key={item.state}>City: {item.city}</li>
              ))} */}

        <div className="Info" />
        <h1 className="title-container__title">
          You searched for a destination that fits this profile:
        </h1>
        <h3 className="title-container__subtitle">Historical:</h3>
        <h3 className="title-container_subtitle">Walkable:</h3>
        <h3 className="title-container_subtitle">Many attractions:</h3>

        <hr />

        <h1 className="title-container__title">Info: </h1>
        <h3 className="title-container__subtitle">Cost:</h3>
        <h3 className="title-container_subtitle">Weather:</h3>
        <h3 className="title-container_subtitle">Attractions:</h3>
      </div>
    );
  }
}

export default Result;
