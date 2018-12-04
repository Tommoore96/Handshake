import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "reactstrap";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import "../index.sass";

class Home extends Component {
  render() {
    return (
      <div className="btn-container">
        <Link to="/signup">
          <Button className="signup option-btn">
            <h2>Sign Up</h2>
          </Button>
        </Link>

        <Link to="/login">
          <Button className="login option-btn">
            <h2>Sign In</h2>
          </Button>
        </Link>
      </div>
    );
  }
}

export default Home;
