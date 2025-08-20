const express = require("express");
const router = express.Router();

//passport
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync.js");
const { SaveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controller/user.js");

router
  .route("/signup")
  .get(usercontroller.userSignupForm) // signup form
  .post(wrapAsync(usercontroller.userSignup)); //signup in DB

router
  .route("/login")
  .get(usercontroller.userloginForm) //login

  .post(
    SaveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usercontroller.userlogin
  );

//logout
router.get("/logout", usercontroller.userlogout);
module.exports = router;
