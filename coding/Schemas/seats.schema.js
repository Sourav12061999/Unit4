const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  show: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "shows" },
  ],
});

const seat = mongoose.model("seats", seatSchema);

module.exports = seat;
