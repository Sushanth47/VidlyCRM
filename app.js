require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var cors = require("cors");
const morgan = require("morgan");
const home = require("./routes/home");
const userRoutes = require("./routes/userRoutes");
const crmRoutes = require("./routes/crmRoutes");
const flash = require("connect-flash");
const session = require("express-session");
const mongoose = require("mongoose");
const port = process.env.PORT || 3027;
var dbURI = process.env.dbURI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(__dirname + "/"));
// app.use("/public", express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: "123",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
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
//Delete Movies

// app.get("/deleteallmovies", async (req, res) => {
//   // await Movie.dropCollection();
//   // await Rental.drop();
//   await Customer.updateMany(
//     {},
//     { $set: { rentedMovies: [], wishList: [], cart: [] } }
//   );
//   return res.json("its done");
// });

// app.get("/test", async (req, res) => {
//   var str = "Hello, World, etc";
//   var myarray = str.split(",");

//   console.log(myarray);

//   return res.json("done");
// });

// app.use(cors({}));
