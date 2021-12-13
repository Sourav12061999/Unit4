const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  timing: { type: String, required: true },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "movies",
  },
  total_seats: { type: Number, required: true },
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "screens",
  },
});

const show = mongoose.model("shows", showSchema);

module.exports = show;
