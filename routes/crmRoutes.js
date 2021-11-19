const express = require("express");
const router = express.Router();
const {
  getDashboardPage,
  getDashboard,
  createMovies,
  createMoviesPage,
  getMoviesPage,
  genreData,
  getClicks,
  // getMovies,
  removeMovies,
  requestedMovies,
  requestedMoviesPage,
} = require("../controllers/crmController");

const { authcheck } = require("../middleware/auth");

//Render Pages Routes

router.get("/dashboard", authcheck, getDashboardPage);

router.get("/createmoviespage", authcheck, createMoviesPage);

router.get("/getmoviespage", authcheck, getMoviesPage);

router.get("/requestedMoviesPage", authcheck, requestedMoviesPage);

//Axios routes
router.get("/dashboard/data", getDashboard);

router.get("/dashboard/genredata", genreData);

router.get("/clicks", getClicks);

//Others

router.post("/createmovies", createMovies);

router.post("/requestedMovies", requestedMovies);

router.post("/removeMovies", removeMovies);

// router.get("/getMovies", getMovies);

module.exports = router;
