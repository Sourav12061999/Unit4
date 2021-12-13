const express = require("express");
const mongoose = require("mongoose");
//All the schemas
const movies = require("./Schemas/movie.schema");
const seats = require("./Schemas/seats.schema");
const theater = require("./Schemas/theater.schema");
const screen = require("./Schemas/screen.schema");
const show = require("./Schemas/show.schema");
const seat = require("./Schemas/seats.schema");

// Multer controller
const upload = require("./Middleware/multer");
const passport = require("./Middleware/passport");

const app = express();

app.use(express.json());

// Get Movies of a specific Actor
app.get("/api/movies/:actor", async (req, res) => {
  let data = await movies.find({ actors: req.params.actor }).lean().exec();
  res.send(data);
});
// Create Movie & Upload it
app.post("/api/movies", upload.single("poster"), async (req, res) => {
  let data = await movies.create({
    name: req.body.name,
    actors: req.body.actors,
    languages: req.body.languages,
    directors: req.body.directors,
    poster_url: req.file.path,
  });
  res.send(data);
});

// Get all available seats for a show
app.get("/api/seats/:showId", async (req, res) => {
  let data = await seats.find({ show: req.params.showId });
  res.send(data);
});

// Get all available seats for a location
app.get(
  "/api/seats/nearest/location=:location/moviename:moviename",
  async (req, res) => {
    let movieData = await movies
      .findOne({ name: req.params.moviename })
      .lean()
      .exec();
    let showData = await show
      .find({ movie: movieData._id })
      .populate("screens")
      .populate({ path: "screens", populate: "threatre" })
      .lean()
      .exec();
    let locationFiltered = showData.filter(
      (el) => el.screen.threatre.location == req.params.location
    );
    res.send(locationFiltered);
  }
);

// Book a new seat
app.post("/api/seat", async (req, res) => {
  let seatData = await seat.find({ show: req.body._id }).lean().exec();
  if (seatData.length) {
    let seatBooked = await seat.create({ show: req.body._id });
    res.send(seatBooked);
  } else {
    res.send("Sorry Seat is not available");
  }
});

// Signup/Signin
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email", "profile"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    successRedirect: "/",
    session: false,
  }),
  function (req, res) {
    res.redirect("/");
  }
);
app.get("/failed", (req, res) => {
  res.send("Sorry Your login failed");
});
app.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

const start = async () => {
  await mongoose.connect(
    "mongodb+srv://Sourav:Sourav1999@cluster0.jbmyk.mongodb.net/eval1312"
  );
  app.listen(80, () => {
    console.log("started");
  });
};

start();
