const Review = require("../models/reviews.js");
const listing = require("../models/listing.js");

//create review
module.exports.createReview = async (req, res) => {
  let { id } = req.params;

  // 1. Find the listing
  let listingone = await listing.findById(id);

  // 2. Create new review from form data
  let newReview = new Review(req.body.review); // or req.body.review if nested
  newReview.created_by = req.user._id;

  // 3. Link review to listing
  listingone.reviews.push(newReview);

  // 4. Save both
  await newReview.save();
  await listingone.save();
  req.flash("success", "Review was Created!");
  res.redirect(`/listings/${id}`);
};

//destroy Review
module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  // 1. Remove review reference from the listing
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // 2. Delete the review document itself
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review was Deleted!");

  // Redirect back to the listing show page
  res.redirect(`/listings/${id}`);
};
