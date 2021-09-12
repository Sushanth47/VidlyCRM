require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
// const cors = require("cors");

const port = process.env.PORT || 3027;
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(__dirname + "public"));
app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  // console.log(req.user, 'requserinappjs')
  next();
});

// app.use(cors({}));
