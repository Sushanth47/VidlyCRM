const jwt = require("jsonwebtoken");
const { Employee } = require("../models/employeeModel");

exports.authcheck = async (req, res, next) => {
  try {
    const stringy = JSON.stringify(req.cookies);
    console.log(stringy, "token");
    if (stringy == "{}") return res.redirect("/crm/user");
    const token = req.cookies.token.token;

    const decoded = jwt.verify(token, process.env.JWTKey);
    var user = await Employee.findOne({ _id: decoded._id });
    req.user = user;
    res.locals.currentUser = req.user;
    next();
  } catch (err) {
    console.log(err);
  }
};
