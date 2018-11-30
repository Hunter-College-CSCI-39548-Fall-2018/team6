import React from "react";

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
      isLoaded: false
    };
    this.submit = this.submit.bind(this);
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
            <input
              className="button"
              type="result"
              value="Submit"
              onClick={e => this.onClickSubmit(e)}
            />
            {/*.bind(this) 
             <button onClick={BrowserHistory.goBack}>Go Back</button>
              <button type="submit"> Back</button> </form> */}
          </div>
          <div className="cityInfo">
            <ol>
              {/* get the asked city Name */}
              {items.map(item => (
                <li key={item.state}>City: {item.city}</li>
              ))}
              {/* get city picture */}
            </ol>
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
  onClickSubmit(e) {
    this.setState({ submit: true });
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
