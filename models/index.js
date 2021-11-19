const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;


module.exports.Employee = require("./employeeModel");
module.exports.Customer = require("./customerModel");
module.exports.Movie = require("./movieModel");
module.exports.Genre = require("./genreModel");
module.exports.Request = require("./requestModel");
module.exports.Rental = require("./rentalModel");
