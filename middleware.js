const ExpressError = require("./utils/ExpressError.js");

const { ListingSchema, ReviewSchema } = require("./schema.js");
const Listing = require("./models/listing");
const Review = require("./models/reviews");

// middleware/isLoggedIn.js
module.exports.IsLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

//redirectUrl
module.exports.SaveRedirectUrl = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const foundListing = await Listing.findById(id);

  if (!foundListing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  if (!req.user) {
    // 🚨 check if logged in
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }

  if (!foundListing.owner) {
    // 🚨 check if listing has an owner
    req.flash("error", "This listing has no owner set!");
    return res.redirect("/listings");
  }

  if (!foundListing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// listing validation
module.exports.listingValidate = (req, res, next) => {
  const { error } = ListingSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, msg)); // stop if invalid
  }

  next(); // continue if valid
};

//review validation    AND Error handaling middleware

module.exports.ReviewValidation = (req, res, next) => {
  const { error } = ReviewSchema.validate(req.body);
  if (error) {
    req.flash("error", error.details.map((e) => e.message).join(","));
    return res.redirect("back");
  }
  next();
};

module.exports.isReviewCreator = async (req, res, next) => {
  const { reviewId, id } = req.params; // id = listing id
  const foundReview = await Review.findById(reviewId);

  if (!foundReview) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  if (!req.user) {
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }

  if (!foundReview.created_by) {
    req.flash("error", "This review has no author set!");
    return res.redirect(`/listings/${id}`);
  }

  if (!foundReview.created_by.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
