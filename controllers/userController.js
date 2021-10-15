
const jwt = require("jsonwebtoken");
const db = require("../models/index");

exports.loginPage = async (req, res) => {
  return res.render("login");
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.Employee.findOne({ email: email });
    if (!user) {
      return res.status(409).json("Wrong Password/Email");
    }
    if (user.password != password) {
      return res.status(409).json("Wrong Password/Email");
    }
    user.active = true;
    user.save();

    return res.status(200).render("dashboard", { user });
  } catch (err) {
    console.log(err);
  }
};

