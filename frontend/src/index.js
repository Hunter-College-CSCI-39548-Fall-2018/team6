import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { Login } from "./Login";
import * as serviceWorker from "./serviceWorker";
import Home2 from "./Home/Home.2";
import "./styles/main.css";

ReactDOM.render(
  <BrowserRouter>
    {/* Home routing- default auth false? */}
    <Switch>
      {/* <Route
        exact
        path="/"
        render={props => <Home2 {...props} isAuthed={false} />}
      /> */}
      <Route exact path="/" component={Home2} />
      <Route exact path="/login" component={Login} />
      <Route component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
