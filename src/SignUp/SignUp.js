import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Home from "../Home/Home";
import "./index.sass";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    const payload = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    fetch("http://localhost:3002/signup", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Link to="/">
          <Button className="back-btn">
            <h1>Back</h1>
          </Button>
        </Link>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-25">
                <label htmlFor="username">Username</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="Username.."
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="password">Password</label>
              </div>
              <div className="col-75">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="password"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="email">Email</label>
              </div>
              <div className="col-75">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="email.."
                />
              </div>
            </div>
            <div className="row">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
