const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
var dbURI = process.env.dbURI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

module.exports.Employee = require("./employeeModel");
module.exports.Customer = require("./customerModel");
module.exports.Movie = require("./movieModel");
module.exports.Genre = require("./genreModel");
module.exports.Request = require("./requestModel");
module.exports.Rental = require("./rentalModel");
