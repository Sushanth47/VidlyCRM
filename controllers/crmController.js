require("dotenv").config();
var express = require("express");
const { Movie } = require("../models/movieModel");
// const Movie = require('../routes/crmRoutes')
exports.getDashboardPage = async (req, res) => {
  return res.status(200).render("dashboard.ejs");
};

exports.getDashboard = async (req, res) => {
  var moviesList = await Movie.find({});
  return res.status(200).json(moviesList);
};
