import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import About from "../pages/About";

export default class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>О нас</h1>
          <br/>
          <About />
        </header>
      </div>
    );
  }
}
