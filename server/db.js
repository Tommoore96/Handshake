const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/handshake");
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose connected");
});

module.exports = db;
