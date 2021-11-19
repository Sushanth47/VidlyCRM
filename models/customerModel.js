var mongoose = require("mongoose");

var customerSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      minlength: 4,
      unique: true,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    phoneToken: {
      type: String,
      default: "N/A",
      sparse: true,
    },
    rentedMovies: [
      [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
        },
      ],
    ],
    reviewedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
    phone: {
      type: String,
      required: true,
      minlength: 4,
      unique: true,
    },
    reviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

var Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;

//  exports.validate = vaildateCustomer;
