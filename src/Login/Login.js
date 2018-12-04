import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from "reactstrap";

class Login extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <Button className="back-btn">
            <h1>Back</h1>
          </Button>
        </Link>
      </div>
    );
  }
}

export default Login;
