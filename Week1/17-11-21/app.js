const express = require("express");
const data = require("./user.data");

const app = express();
app.use(express.json());
app.get("/", function (req, res) {
  res.send("hello world");
});

app.get("/users", function (req, res) {
  res.send(data);
});

app.listen(80, () => {
  console.log("Server is on Port http://localhost:80");
});
