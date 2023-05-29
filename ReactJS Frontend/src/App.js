import React, {Component, useState} from "react";
import {Routes, Route, Link, Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Modal from "react-bootstrap/Modal";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import AddRow from "./rows/AddRow";
import EditRow from "./rows/EditRow";
import ViewRow from "./rows/ViewRow";
import EventBus from "./common/EventBus";
import FooterComponent from "./components/footer.component";
import About from "./pages/About";
import AccessDenied from "./components/AccessDenied";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      searchTerm: "",
      showLoginModal: false,
      showProfileModal: false,
    };
  }

  openLoginModal = () => {
    this.setState({ showLoginModal: true });
  };

  closeLoginModal = () => {
    this.setState({ showLoginModal: false });
  };

  openProfileModal = () => {
    this.setState({ showProfileModal: true });
  };

  closeProfileModal = () => {
    this.setState({ showProfileModal: false });
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    const { userRole } = this.state;
    const searchTerm = this.state.searchTerm;


    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Cr¥pto ₿oy$
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                {userRole === "ROLE_ADMIN" && (
                    <Link to="localhost:8081/wiki/new" className="btn btn-primary">
                      Add
                    </Link>
                )}
              </li>

              {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                      Модер
                    </Link>
                  </li>
              )}

              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Админ
                    </Link>
                  </li>
              )}

              {currentUser && (
                  <li className="nav-item">
                    <Link to={"/about"} className="nav-link">
                      О нас
                    </Link>
                  </li>
              )}
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="#" className="nav-link" onClick={this.openProfileModal}>
                      {currentUser.username}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/" className="nav-link" onClick={this.logOut}>
                      Выйти
                    </a>
                  </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="#" className="nav-link" onClick={this.openLoginModal}>
                      Войти
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Регистрация
                    </Link>
                  </li>
                </div>
            )}
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/mod" element={<BoardModerator />} />
              <Route path="/admin" element={currentUser && showAdminBoard ? <BoardAdmin /> : <Navigate to="/" />} />
              <Route path="/wiki/new" element={<AddRow />} />
              <Route path="/wiki/update/:id" element={currentUser && showAdminBoard ? <EditRow /> : <Navigate to="/" />} />
              <Route path="/wiki/:id" element={<ViewRow />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>

          <Modal show={this.state.showLoginModal} onHide={this.closeLoginModal}>
            <Login onClose={this.closeLoginModal} />
          </Modal>

          <Modal show={this.state.showProfileModal} onHide={this.closeProfileModal}>
            <Profile onClose={this.closeProfileModal} />
          </Modal>

          <FooterComponent />
        </div>
    );
  }
}

export default App;