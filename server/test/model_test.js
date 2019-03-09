const mocha = require("mocha");
const assert = require("assert");
const UserModel = require("../model.js");
const mongoose = require("mongoose");
require("../db.js");
const fetch = require("node-fetch");

function postUser() {
  fetch("http://localhost:3002/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "tommoore.dev@gmail.com",
      username: "tommcfc",
      password: "MCFCMoore"
    })
  })
    .then(res => res.json())
    .then(res => res.tokens);
}

describe("Users:", function() {
  it("should return tokens", function(done) {
    console.log(postUser());

    assert.equal(postUser().length, 1);
  });

  it("should save users", function(done) {
    UserModel.find({ email: "tommoore.dev@gmail.com" }, (err, name) => {
      if (err) {
        throw err;
      }
      if (name.length === 0) {
        throw new Error("No data!");
      }
      done();
    });
  });

  after(function(done) {
    UserModel.find({ email: "tommoore.dev@gmail.com" })
      .deleteOne(done)
      .exec();
  });
});
