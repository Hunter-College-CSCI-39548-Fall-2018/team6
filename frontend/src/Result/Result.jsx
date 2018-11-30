import React from "react";

//const BrowserHistory = require("react-router/lib/BrowserHistory").default;
//import { Nav, Navbar, NavItem } from "react-bootstrap";
//import AuthService from "../AuthService/AuthService";
//const Auth = new AuthService();
/*
Topgyal 
Result 

*/
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }
  //method runs after render and updates render method
  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/adrian-stru/travel-filters/master/DATA/json/attractions.json?token=ARfVeQkcPKWc6HCyHfODTXWdxAkqGqebks5cCgdfwA%3D%3D"
    ) //url of api
      .then(res => res.json()) //convert result into json
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json //getting data from api into state items
        });
      });
    //.catch(error=>console.log('parsing failed',error))
  }
  render() {
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>laoding..</div>;
    } else {
      return (
        <div className="main">
          <div className="back_button">
            <form onSubmit={this.handleSubmit}>
              {/*.bind(this) 
             <button onClick={BrowserHistory.goBack}>Go Back</button>*/}
              <button type="submit"> Back</button>
            </form>
          </div>
          <div className="cityInfo">
            <ul>
              {/* get the asked city Name */}
              {items.map(item => (
                <li key={item.state}>CityList:{item.city}</li>
              ))}
              {/* get city picture */}
            </ul>
          </div>
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
}
/*
React.render((
    <Router history={BrowserHistory}>
        <Route path="/" component={Result} />
    </Router>
), document.body);
*/
export default Result;
