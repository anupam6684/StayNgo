const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

const Listingcontroller = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

//IsloggedIn middleware
const { IsLoggedIn, isOwner, listingValidate } = require("../middleware");

router
  .route("/")
  .get(wrapAsync(Listingcontroller.index)) //index route
  .post(
    IsLoggedIn, //Create route
    listingValidate,
    upload.single("listing[image]"),
    wrapAsync(Listingcontroller.createListing)
  );

// new route
router.get("/new", IsLoggedIn, Listingcontroller.renderNewform);
// new route
router.get("/search", Listingcontroller.SearchRoute);

router
  .route("/:id")
  .get(wrapAsync(Listingcontroller.showlistingOne)) // show route
  .patch(
    IsLoggedIn, //update route
    isOwner,
    listingValidate,
    upload.single("listing[image]"),
    wrapAsync(Listingcontroller.updateListing)
  )
  .delete(IsLoggedIn, isOwner, wrapAsync(Listingcontroller.deleteListing)); //delete route

//edit route
router.get(
  "/:id/edit",
  IsLoggedIn,
  isOwner,
  wrapAsync(Listingcontroller.editlistingForm)
);

module.exports = router;
