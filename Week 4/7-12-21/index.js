const express = require("express");
const mongoose = require("mongoose");
const passport = require("./passport.config");
const user = require("./Schemas/user.schema");
const app = express();
app.use(express.json());
app.use(passport.initialize());
// app.use(passport.authenticate());
const connet = () => {
  return mongoose.connect(
    "mongodb+srv://Sourav:Sourav1999@cluster0.jbmyk.mongodb.net/assignment"
  );
};
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email", "profile"],
  })
);
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
    session: false,
  }),
  function (req, res) {
    res.redirect("/");
  }
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
    session: false,
  })
);

app.get("/", async (req, res) => {
  res.send("home");
});
app.get("/login", async (req, res) => {
  res.send("failed");
});
const start = async () => {
  await connet();
  app.listen(80, () => {
    console.log("Server Started");
  });
};

start();
