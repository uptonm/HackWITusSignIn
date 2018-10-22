import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Landing from "./Landing";
import Form from "./Form";
import * as actions from "../actions";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <main>
            <Route exact path="/" component={Landing} />
            <Route path="/follow-up" component={Form} />
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
