const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, require: true },
  password: String,
  profile_photo_url: String,
  roles: [String],
});

const user = mongoose.model("users", userSchema);

module.exports = user;
