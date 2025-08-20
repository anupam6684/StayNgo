const listing = require("../models/listing.js");

//index
module.exports.index = async (req, res) => {
  const all_listing = await listing.find({});
  res.render("listing/index.ejs", { all_listing });
};

// new route
module.exports.renderNewform = (req, res) => {
  res.render("listing/new.ejs");
};

// search route controller
module.exports.SearchRoute = async (req, res) => {
  try {
    let query = req.query.q || "";

    // if query empty
    if (query.trim() === "") {
      req.flash("error", "Please enter a search term");
      return res.redirect("/listings");
    }

    // search in title
    const Listings = await listing.find({
      title: { $regex: query, $options: "i" },
    });

    // if no matches
    if (Listings.length === 0) {
      req.flash("error", "No listings found");
      return res.redirect("/listings");
    }

    // render search results
    res.render("listing/index.ejs", { all_listing: Listings });
  } catch (err) {
    console.error("Search error:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/listings");
  }
};

//show listing
module.exports.showlistingOne = async (req, res) => {
  const { id } = req.params;
  const listingOne = await listing
    .findById(id)
    .populate({
      path: "reviews", // ✅ correct: should match your schema
      populate: { path: "created_by" }, // ✅ if reviews have a "created_by" field
    })
    .populate("owner");
  console.log(listingOne);

  if (!listingOne) {
    req.flash("error", "Listing doesn't exist");
    return res.redirect("/listings"); // ✅ return + redirect
  }

  res.render("listing/show.ejs", { listingOne });
};

//Create listing
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const Newlisting = new listing(req.body.listing);
  Newlisting.owner = req.user._id;
  Newlisting.image = { url, filename };
  await Newlisting.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

//edit listing
module.exports.editlistingForm = async (req, res) => {
  let { id } = req.params;
  const editlisting = await listing.findById(id);

  if (!editlisting) {
    req.flash("error", "Listing doesn't exist");
    return res.redirect("/listings"); // ✅ return + redirect
  }
  let originalImageUrl = editlisting.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/ar_1.0,c_fill,h_250/bo_5px_solid_lightblue"
  );
  res.render("listing/edit.ejs", { editlisting, originalImageUrl });
};

//update listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let Listing = await listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    Listing.image = { url, filename };
    await Listing.save();
  }
  req.flash("success", "Listing Was Update!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedlisting = await listing.findByIdAndDelete(id);
  req.flash("success", "Listing Was Deleted!");

  res.redirect("/listings");
};
