if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

const listingsRoutes = require("./routes/listings.js");
const reviewsRoutes = require("./routes/reviews.js");
const userRoutes = require("./routes/user.js");
// express-session
const session = require("express-session");

//session mongo
const MongoStore = require("connect-mongo");
//flash
const flash = require("connect-flash");
// const flash = require("express-flash-message");

//passport
const passport = require("passport");
const LocalStrategy = require("passport-local");

//user model
const User = require("./models/user.js");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const DB_Url = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
// connect to DB
async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 10000, // 10s timeout
  });
  console.log("✅ Connected to MongoDB Atlas");
}
// session store
const store = MongoStore.create({
  mongoUrl: DB_Url,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // time period in seconds
});

store.on("error", (err) => {
  console.log("Error in mongo session store", err);
});

// session config
const sessionOption = {
  store,
  secret: process.env.SECRET || "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// session + flash
app.use(session(sessionOption));
app.use(flash());

// root route (should be after session & flash)
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// user set up  for authentication
//1. passport initialize middleware
app.use(passport.initialize());
//2.passport session middleware  to know the session go shipt page to page
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser()); // Generates a function that is used by Passport to serialize users into the session

passport.deserializeUser(User.deserializeUser()); // Generates a function that is used by Passport to deserialize users into the session

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;

  next();
});

//router set up
app.use("/listings", listingsRoutes);
app.use("/listings/:id/reviews", reviewsRoutes);
app.use("/", userRoutes);

// // //custom Express Error
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "page not found"));
});
// custom Error handling
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listing/error.ejs", { message });
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
