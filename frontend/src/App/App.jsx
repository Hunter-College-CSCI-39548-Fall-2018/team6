import React, { Component } from "react";
import "./App.css";
import TravelNav from "../TravelNav/TravelNav";
import Survey from "../Survey/Survey";
// import ResultList from "../ResultList/ResultList";
import RHistory from "../History/History";
import Home from "../Home/Home.1";
import { Switch, Route } from "react-router-dom";
import withAuth from "../AuthService/WithAuth";

class App extends Component {
  render() {
    return (
      <div>
        <TravelNav loggedIn={true} />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/history" component={RHistory} />
          <Route exact path="/survey" component={Survey} />
          {/* <Route exact path="/result-list" component={ResultList} /> */}
        </Switch>
      </div>
    );
  }
}

// export default App;
export default withAuth(App);
