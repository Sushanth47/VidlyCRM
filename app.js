require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const home = require("./routes/home");
const userRoutes = require("./routes/userRoutes");
const crmRoutes = require("./routes/crmRoutes");
const port = process.env.PORT || 3027;
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(__dirname + "public"));
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", home);
app.use("/crm/user", userRoutes);
app.use("/crm/crm", crmRoutes);

app.get("/", async (req, res) => {
  return res.status(200).json("This is the First Page");
});

app.get("/getPage", async (req, res) => {
  return res.status(200).render("dashboard");
});

app.listen(port, "0.0.0.0", () => console.log("Connected Succcessfully"));

// app.use(cors({}));
