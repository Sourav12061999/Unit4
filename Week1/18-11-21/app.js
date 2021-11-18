const express = require("express");
const data = require("./MOCK_DATA.json");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(data);
});
app.post("/book", (req, res) => {
  let user = req.body;
  res.send({ ...user, id: data.length + 1 });
});
app.get("/book/:id", (req, res) => {
  let id = req.params.id;
  let ans = data.filter((element) => element.id == id);
  res.send(ans);
});
app.patch("/book/:id", (req, res) => {
  let id = req.params.id;
  let extra = req.body;
  let ans = data.filter((element) => element.id == id);
  res.send({ ...ans[0], ...extra });
});
app.delete("/book/:id", (req, res) => {
  let id = req.params.id;
  let ans = data.filter((element) => element.id != id);
  res.send(ans);
});
app.listen(80, () => {
  console.log("Server is running");
});
