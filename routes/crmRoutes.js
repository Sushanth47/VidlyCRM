const express = require("express");
const router = express.Router();
const {
  getDashboardPage,
  getDashboard,
  createMovies,
  createMoviesPage,
  getMoviesPage,
  genreData,
  getMovies,
  requestedMovies,
  requestedMoviesPage,
} = require("../controllers/crmController");

router.get("/dashboard", getDashboardPage);

router.get("/dashboard/data", getDashboard);

router.get("/dashboard/genredata", genreData);

router.get("/createmoviespage", createMoviesPage);

router.post("/createmovies", createMovies);

router.get("/getmoviespage", getMoviesPage);

router.get("/requestedMoviesPage", requestedMoviesPage);

router.get("/requestedMovies", requestedMovies);

router.get("/getMovies", getMovies);

module.exports = router;
