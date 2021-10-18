const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trime: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    genre: {
      type: String,
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
    imdbRating: { type: String, default: "" },
    director: { type: String, default: "" },
    mpAARating: { type: String, default: "" },
    awards: { type: String, default: "" },
    runtime: { type: String, default: "" },
    aspectRatio: { type: String, default: "" },
    worldwide: { type: String, default: "" },
    ismovieCreated: { type: Boolean, default: false },
    requestCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
