const jwt = require("jsonwebtoken");
const { Employee } = require("../models/employeeModel");

exports.authcheck = async (req, res, next) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWTKey);
  var user = await Employee.findOne({ _id: decoded._id });
  req.user = user;
  res.locals.currentUser = req.user;
  next();
};
