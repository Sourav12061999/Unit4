const express = require("express");
const mongoose = require("mongoose");

const evalConroller = require("./routers/eval.router");
const highest = require("./routers/highest.router");

const app = express();

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://Sourav:Sourav1999@cluster0.jbmyk.mongodb.net/assignment"
  );
};

app.use(express.json());

app.use("/api", evalConroller);
app.use("/api/student/highest", highest);

const start = async () => {
  await connect();
  app.listen(80, () => {
    console.log("Server Started");
  });
};

start();
