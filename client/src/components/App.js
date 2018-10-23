import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Landing from "./Landing";
import FormSubmit from "./Form-Submit";
import Form from "./Form";
import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <main>
            <Route exact path="/" component={Landing} />
            <Route path="/follow-up" component={Form} />
            <Route path="/post-sign-in" component={FormSubmit} />
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
