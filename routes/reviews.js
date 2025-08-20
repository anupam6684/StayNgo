const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");

const Reviewcontroller = require("../controller/review.js");

const {
  IsLoggedIn,
  ReviewValidation,
  isReviewCreator,
} = require("../middleware");

//revies   routing
router.post(
  "/",
  IsLoggedIn,
  ReviewValidation,
  wrapAsync(Reviewcontroller.createReview)
);

router.delete(
  "/:reviewId",
  IsLoggedIn,
  isReviewCreator,
  wrapAsync(Reviewcontroller.deleteReview)
);

module.exports = router;
