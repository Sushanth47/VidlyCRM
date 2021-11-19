const jwt = require("jsonwebtoken");
const { Employee } = require("../models/employeeModel");
const { Movie } = require("../models/movieModel");

exports.loginPage = async (req, res) => {
  return res.render("login", { message: req.flash("message") });
};

exports.signUp = async (req, res) => {
  return res.render("signup.ejs", { message: req.flash("message") });
};

async function generateAuthToken(res, _id, name) {
  const expiration = 604800000;
  const token = jwt.sign({ _id: _id, name: name }, process.env.JWTKey, {
    expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
  });
  console.log(token);
  var obj = {
    token: token,
    name: name,
    _id: _id,
  };
  res.cookie("token", obj, {
    expires: new Date(Date.now() + expiration),
    httpOnly: true,
    secure: true,
  });
  return token;
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email: email });
    if (!user || user.password != password) {
      req.flash("message", "Invalid Email/Password");
      return res.status(409).redirect("/crm/user");
    }

    const token = await generateAuthToken(res, user._id, user.name);

    user.save();

    return res.status(200).redirect("/crm/crm/dashboard");
  } catch (err) {
    console.log(err);
  }
};

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, phone, name } = req.body;
    const user = await Employee.findOne({ email: email });
    if (user) {
      req.flash("message", "User already Exists");
      return res.status(409).redirect("/crm/user/signup");
    }
    await Employee.create({
      email: email,
      name: name,
      password: password,
      phone: phone,
    });
    // await generateAuthToken(res, emp._id, name);
    req.flash("message", `Employee Added ${name}`);
    return res.status(200).redirect("/crm/user/signup");
  } catch (err) {
    console.log(err);
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.redirect("/crm/user");
  } catch (err) {
    console.log(err);
  }
};
