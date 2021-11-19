const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    movie: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
      },
    ],
    movies: [
      {
        type: String,
        required: true,
      },
    ],
    dateOut: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
    checkOut: { type: String },
  },
  { timestamps: true }
);

const Rental = mongoose.model("Rental", rentalSchema);

exports.Rental = Rental;
