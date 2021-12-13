const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: [{ type: String, required: true }],
});

const theater = mongoose.model("theaters", theaterSchema);

module.exports = theater;
