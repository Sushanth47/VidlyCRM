require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const port = process.env.PORT || 3027;
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(__dirname + "public"));
app.use(cookieParser());

app.get("/", async (req, res) => {
  return res.status(200).json("This is the First Page");
});

app.listen(port, "0.0.0.0", () => console.log("Connected Succcessfully"));

// app.use(cors({}));
