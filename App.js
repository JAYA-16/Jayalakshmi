import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import Signup from "./components/instagram/Signup";
import Signin from "./components/instagram/Signin";
import Main1 from "./components/instagram/Main1";
export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Router>
            <Switch>
              <Route exact path="/" component={Signup} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/main" component={Main1} />
            </Switch>
          </Router>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
