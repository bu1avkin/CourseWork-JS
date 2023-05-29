import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/Profile.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
        <Modal.Dialog>
          <Modal.Header closeButton onClick={this.props.onClose}>
            <Modal.Title>Профиль</Modal.Title>
            </Modal.Header>
          <Modal.Body>
            <div className="container">
              {this.state.userReady && (
                  <div className="profile-container">
                    <header className="profile-header">
                      <h3>
                        Профиль <strong>{currentUser.username}</strong>
                      </h3>
                    </header>
                    <div className="profile-details">
                      <p>
                        <strong>Ваш ID (он нужен для тех. поддержки):</strong> {currentUser.id}
                      </p>
                      <p>
                        <strong>Ваша почта:</strong> {currentUser.email}
                      </p>
                      <div className="profile-authorities">
                        <strong>Ваши права:</strong>
                        <ul>
                          {currentUser.roles &&
                              currentUser.roles.map((role, index) => (
                                  <li key={index}>{role}</li>
                              ))}
                        </ul>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onClose}>Закрыть</Button>
          </Modal.Footer>
        </Modal.Dialog>
    );
  }
}