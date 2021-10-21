require("dotenv").config();
const { Movie } = require("../models/movieModel");
const { Genre } = require("../models/genreModel");
const { Customer } = require("../models/customerModel");
const { Requested } = require("../models/requestModel");

exports.getDashboardPage = async (req, res) => {
  return res.status(200).render("dashboard.ejs");
};

exports.getDashboard = async (req, res) => {
  var moviesList = await Movie.aggregate([
    {
      $match: {
        rentedCustomers: { $ne: [] },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        rentedCustomers: 1,
      },
    },
    {
      $sort: { rentedCustomers: 1 },
    },
    {
      $limit: 5,
    },
  ]);
  var wishlistmovies = await Customer.find(
    {},
    "rentedMovies cart wishList"
  ).limit(5);

  var rentedMovies = await Customer.aggregate([
    {
      $group: {
        _id: { rentedMovies: { $size: "$rentedMovies" } },
        count: { $sum: 1 },
      },
    },
  ]);
  console.log(rentedMovies);
  var wishListMovies = await Customer.aggregate([
    {
      $group: {
        _id: { wishList: { $size: "$wishList" } },
        count: { $sum: 1 },
      },
    },
  ]);
  console.log(wishListMovies);
  const topmovies = [];
  console.log(wishlistmovies);
  wishlistmovies.forEach((list) => {
    for (var i = 0; i < list.rentedMovies.length; i++) {
      topmovies.push(list.rentedMovies[i]);
    }
    for (var i = 0; i < list.cart.length; i++) {
      topmovies.push(list.cart[i]);
    }
    for (var i = 0; i < list.wishList.length; i++) {
      topmovies.push(list.wishList[i]);
    }
  });
  var freq = {};
  for (var i = 0; i < topmovies.length; i++) {
    var character = topmovies[i];
    if (freq[character]) {
      freq[character]++;
    } else {
      freq[character] = 1;
    }
  }
  console.log(freq);

  return res.status(200).json(moviesList);
};

exports.createMovies = async (req, res) => {
  try {
    const genre = await Genre.findOne({ name: req.body.genreName });
    if (!genre) return res.status(400).json("Invalid Genre");
    const movieadd = req.body.title;
    const checkmovie = await Movie.findOne({
      title: { $regex: req.body.title, $options: "$i" },
    });
    if (checkmovie) return res.status(409).send("Movie already exists");
    var axios = require("axios").default;
    const cheerio = require("cheerio");
    await Requested.findOneAndUpdate(
      { title: { $regex: req.body.title, $options: "$i" } },
      { ismovieCreated: true }
    );
    var options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/auto-complete",
      params: { q: movieadd },
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": process.env.API_HOST,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        var apidata = response.data;
        let newarr = [];
        apidata.d.forEach((list) => {
          if (list.q) {
            if (list.q == "feature") {
              newarr.push(list);
            }
          }
        });
        let movie = new Movie({
          title: newarr[0].l,
          genreId: genre._id,
          year: newarr[0].y,
          img: newarr[0].i.imageUrl,
          links: "https://www.imdb.com/title/" + newarr[0].id + "/",
          cast: newarr[0].s,
          rank: newarr[0].rank,
          genre: genre.name,
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate,
          ismovieCreated: true,
        });
        var newrat = "";
        var direcTor = "";
        var mpAA = "";
        var runTime = "";
        var ratio = "";
        var worldwide = "";
        axios(movie.links).then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          $(".ipc-button__text", html).each(function () {
            const title = $(this).text();
            if (title && title.startsWith(".", 1)) {
              const i = title.indexOf("/");
              var rat = title.substr(0, i);
              if (!movie.imdbRating) newrat = rat;
            }
          });
          $(".ipc-metadata-list__item", html).each(function () {
            const title = $(this).text();
            if (title) {
              if (title.startsWith("Director")) {
                const director = title.substr(8, 25);
                direcTor = director;
              }

              if (title.startsWith("Runtime")) {
                const runtime = title.substr(7, title.length);
                runTime = runtime;
              }
              if (title.startsWith("Certificate")) {
                const certificate = title.substr(11, title.length);
                mpAA = certificate;
              }
              if (title.startsWith("Gross worldwide")) {
                const i = title.indexOf("$");
                const gross = title.substr(i, title.length);
                worldwide = gross;
              }
              if (title.startsWith("Aspect ratio")) {
                const rattio = title.substr(12, title.length);
                ratio = rattio;
              }
            }
          });
        });
        setTimeout(function () {
          movie.imdbRating = newrat;
          movie.director = direcTor;
          movie.runtime = runTime;
          movie.aspectRatio = ratio;
          if (mpAA == "Not Rated") {
            movie.mpAARating = "A";
          } else {
            movie.mpAARating = mpAA;
          }
          movie.worldwide = worldwide;
          movie.save();
          res.status(200).redirect(`/crm/crm/createmoviespage`);
        }, 5000);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getMoviesPage = async (req, res) => {
  return res.render("movies.ejs");
};

exports.requestedMoviesPage = async (req, res) => {
  return res.render("requestedmovies.ejs");
};

exports.requestedMovies = async (req, res) => {
  var customer = await Requested.aggregate([
    {
      $project: {
        title: 1,
        ismovieCreated: 1,
        requestCount: 1,
        noneInStock: 1,
      },
    },
  ]);
  return res.status(200).json({ customer: customer });
};

exports.getMovies = async (req, res) => {
  const perPage = 9;
  const page = req.query.pageNo;
  const movieCount = await Movie.countDocuments();
  const movies = await Movie.aggregate([
    {
      $lookup: {
        from: "genres",
        localField: "genreId",
        foreignField: "_id",
        as: "genre",
      },
    },
    {
      $unwind: "$genre",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        img: 1,
        genreId: 1,
        rank: 1,
        cast: 1,
        year: 1,
        links: 1,
        dailyRentalRate: 1,
        ismovieCreated: 1,
        requestCount: 1,
        genre: 1,
        imdbRating: 1,
      },
    },
    {
      $sort: { _id: -1 },
    },
    {
      $skip: perPage * (page - 1),
    },
    {
      $limit: perPage,
    },
  ]);
  return res.status(200).json({ movieCount: movieCount, movies: movies });
};

exports.createMoviesPage = async (req, res) => {
  const allGenres = await Genre.aggregate([
    {
      $project: {
        name: 1,
      },
    },
  ]);
  return res.status(200).render("createmovies.ejs", { allGenres: allGenres });
};
