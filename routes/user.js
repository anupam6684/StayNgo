const express = require("express");
const router = express.Router();

// Models & Controllers
const User = require("../models/user.js");
const usercontroller = require("../controller/user.js");

// Passport
const passport = require("passport");

// Utils
const wrapAsync = require("../utils/wrapAsync.js");
const { IsLoggedIn, SaveRedirectUrl } = require("../middleware.js");

//uplode profile photo
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

// ---------------- SIGNUP ----------------
router
  .route("/signup")
  .get(usercontroller.userSignupForm) // signup form
  .post(wrapAsync(usercontroller.userSignup)); // signup in DB

// ---------------- LOGIN ----------------
router
  .route("/login")
  .get(usercontroller.userloginForm)
  .post(
    SaveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usercontroller.userlogin
  );

// ---------------- PROFILE ----------------
// Show profile
router.get("/user/profile", IsLoggedIn, usercontroller.profile);

// Edit profile
router
  .route("/user/profile/edit")
  .get(IsLoggedIn, usercontroller.profileEditForm)
  .patch(
    IsLoggedIn,
    upload.single("image"),
    wrapAsync(usercontroller.profileEdit)
  );

// Change password
router
  .route("/user/profile/password")
  .get(IsLoggedIn, usercontroller.ChangePasswordForm)
  .post(IsLoggedIn, wrapAsync(usercontroller.ChangePassword));

// ---------------- LOGOUT ----------------
router.get("/logout", IsLoggedIn, usercontroller.userlogout);

module.exports = router;
