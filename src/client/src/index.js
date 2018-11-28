import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { Survey } from "./Survey";
/* import { Results } from "./Results"; */
import { ResetPassword } from "./ResetPassword";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
        {/* To have nested routes/same page multiple componnets
    <Route component={MainLayout}>
      <Route path ="/" component={Home}/>
       <Route component={Inner}>
          <Route path="list1" component={List}/>
          <Route path="list2" component={List2}/>
        </Route>2
    </Route>
    */}
        <Switch>
            <Route path="/" component={App} />
            <Route path="/Reset" component={ResetPassword} />
            <Route path="/Login" exact component={App} />
            <Route path="/Survey" component={Survey} />
        </Switch>

        {/* <App /> */}
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
