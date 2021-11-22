const app = require("express")();
// app.use(logger);
function authorise() {
  return (req, res, next) => {
    const originalSendFunc = res.send.bind(res);
    res.send = function (body) {
      body.name = "Nrupul Dev";
      console.log(body); // do whatever here
      return originalSendFunc(body);
    };
    next();
  };
}

app.get("/", authorise, (req, res) => {
  res.send({ name: "Sourav" });
});
function logger(req, res, next) {
  console.log("OK");
  next();
}
app.listen(80, () => {
  console.log("Server Running");
});
