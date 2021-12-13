const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  threatre: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "theaters" },
  ],
});

const screen = mongoose.model("screens", screenSchema);

module.exports = screen;
