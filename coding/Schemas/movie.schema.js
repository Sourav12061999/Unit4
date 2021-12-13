const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  actors: [{ type: String, required: true }],
  languages: [{ type: String, required: true }],
  directors: [{ type: String, required: true }],
  poster_url: { type: String, required: true },
});

const movie = mongoose.model("movies", movieSchema);

module.exports = movie;
