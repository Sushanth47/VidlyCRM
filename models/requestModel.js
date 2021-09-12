const mongoose = require("mongoose");

const requestedSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trime: true,
    },
    ismovieCreated: { type: Boolean, default: false },
    requestCount: { type: Number },
    noneInStock: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Requested = mongoose.model("Requested", requestedSchema);

exports.Requested = Requested;
