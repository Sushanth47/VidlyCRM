const { authcheck } = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const { loginPage, login } = require("../controllers/userController");

router.get("/", loginPage);

router.post("/login", login);
