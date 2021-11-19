const { authcheck } = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const {
  loginPage,
  login,
  signUp,
  logOut,
  signup,
} = require("../controllers/userController");

router.get("/", loginPage);

router.post("/login", login);

router.get("/signup", signUp);

router.post("/addcustomer", signup);

router.get("/logout", logOut);

module.exports = router;
