import React from 'react';
import {Link} from "react-router-dom";


export default class Header extends React.Component {

  renderUser() {
    const {userData, logout} = this.props;

    if (null === userData) {
      return (<i className="fas fa-spinner fa-spin"/>);
    }

    return (
      <span>
        Hello {userData.firstname} {userData.lastname} &nbsp;
        <Link className="link-primary" to="/welcome" onClick={logout}>Logout</Link>
      </span>
    );
  }

  render() {
    const {isAuthenticated, histo} = this.props;
    let welco = false;
    if(histo == "/welcome"){
      welco = true
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/welcome" className="navbar-brand">
          COVID 19 TESTING PLATFORM
        </Link>

        <ul className="navbar-nav mr-auto">
          {
            !isAuthenticated && !welco &&
            (
              <li className="nav-item">
                <Link to="/register" className="link-primary">Register</Link>
              </li>
            )
          }
          {
            isAuthenticated &&
            (
              <li className="nav-item">
                <Link to="/appointment-form" className="link-primary">
                  Add Appointment
                </Link>
              </li>
            )
          }
        </ul>
          
        <span className="nav-item">
          {isAuthenticated ? this.renderUser() : welco ? <p></p> : <Link className="link-primary" to="/login">Sign-in</Link>}
        </span>
      </nav>
    );
  }
}