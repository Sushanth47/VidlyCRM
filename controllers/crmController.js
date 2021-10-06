require("dotenv").config();
var express = require("express");
const { Movie } = require("../models/movieModel");

exports.getDashboardPage = async (req, res) => {
  return res.status(200).render("dashboard.ejs");
};

exports.getDashboard = async (req, res) => {
  var moviesList = await Movie.aggregate([
    {
      $project: {
        _id: 1,
        title: 1,
        rentedCustomers: 1,
      },
    },
    {
      $limit: 5,
    },
  ]);
  return res.status(200).json(moviesList);
};
