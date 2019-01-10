const mocha = require("mocha");
const assert = require("assert");
const UserModel = require("../model.js");
const mongoose = require("mongoose");
const db = require("../db.js");

describe("Users:", function() {
  it("should save new users", function(done) {
    const user = new UserModel({
      first_name: "Thomas",
      surname: "Moore",
      email: "tommoore.dev@gmail.com",
      username: "tommcfc",
      pass_hash: "27If",
      city: "Manchester",
      country: "United Kingdom",
      age: 22,
      joined_at: new Date()
    });

    user.save(done);
  });

  it("should find users", function(done) {
    UserModel.find({ first_name: "Thomas" }, (err, name) => {
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
    UserModel.find({ first_name: "Thomas" })
      .deleteOne(done)
      .exec();
  });
});
