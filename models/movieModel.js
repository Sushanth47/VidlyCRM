const mongoose = require("mongoose");
// const Joi = require('Joi');
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trime: true,
    },
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    rank: { type: Number },
    cast: { type: String },
    year: { type: String },
    img: {
      type: String,
    },
    links: {
      type: String,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    rentedCustomers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],
    ismovieCreated: { type: Boolean, default: false },
    requestCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
