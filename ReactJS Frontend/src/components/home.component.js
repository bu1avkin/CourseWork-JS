import React, { Component } from "react";

import UserService from "../services/user.service";
import Cards from "../pages/Cards"

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container mt-1">
        {/*<header className="jumbotron">*/}
          <h2>СЛОВАРЬ ДЛЯ КРИПТО-ТРЕЙДИНГА</h2>
          <p>Здесь вы можете посмотреть все определения, весь сленг настоящих крипто-гачитрейдеров.</p>
            <p>Сохраните страничку, чтобы понимать, о чем Ваши коллеги разговаривают в чате!</p>
          <Cards />
        {/*</header>*/}
      </div>
    );
  }
}
