const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://Sourav:Sourav1999@cluster0.jbmyk.mongodb.net/test",
    {
      useNewUrlParser: true,
      //   useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );
};
const userSchema = new mongoose.Schema({
  Book: { type: String, required: true },
  Aurthor: { type: String, required: true },
  Section: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);

app.get("/api/books", async (req, res) => {
  let data = await user.find({}).lean().exec();
  res.send(data);
});
const start = async () => {
  await connect();
  app.listen(80, () => {
    console.log("Server Started");
  });
};

start();
