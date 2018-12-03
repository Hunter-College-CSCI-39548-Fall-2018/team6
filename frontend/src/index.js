import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { Login } from "./Login";
import * as serviceWorker from "./serviceWorker";
import "./styles/main.css"

/*
Author: Eunice Hew
Routing for login page and components with the navigation bar
*/

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
