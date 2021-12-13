const express = require("express");
const movies = require("../Schemas/movie.schema");
const upload = require("../Middleware/multer");

const router = express.Router();

router.get("/:actor", async (req, res) => {
  let data = await movies.find({ actors: req.params.actor }).lean().exec();
  res.send(data);
});

// router.post("/", upload.single("poster"), async (req, res) => {
//   let data = await movies.create({
//     name: req.body.name,
//     actors: req.body.actors,
//     languages: req.body.languages,
//     directors: req.body.directors,
//     poster_url: req.file.path,
//   });
//   res.send(data);
// });

module.exports = router;
