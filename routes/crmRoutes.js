const express = require("express");
const router = express.Router();
const {
  getDashboardPage,
  getDashboard,
  createMovies,
  createMoviesPage,
} = require("../controllers/crmController");
router.get("/dashboard", getDashboardPage);

router.get("/dashboard/data", getDashboard);

router.get("/createmoviespage", createMoviesPage);

router.post("/createmovies", createMovies);

router.get("/getmoviespage", getmoviespage);

router.get("/requestedMoviesPage", requestedMoviesPage);

router.get("/requestedMovies", requestedMovies);

router.get("/getMovies", getMovies);

module.exports = router;
