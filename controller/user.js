//user model
const User = require("../models/user.js");

//signup form
module.exports.userSignupForm = (req, res) => {
  res.render("user/signup.ejs");
};

//user signup
module.exports.userSignup = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    let Newuser = new User({ email, username });

    let registerUser = await User.register(Newuser, password);
    req.login(registerUser, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to STAYNGO");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

//user login form
module.exports.userloginForm = (req, res) => {
  res.render("user/login.ejs");
};

//user login
module.exports.userlogin = async (req, res) => {
  req.flash("success", "Wellcome back to StayNgo");
  let returnTo = res.locals.returnTo || "/listings";
  res.redirect(returnTo);
};

//user log out
module.exports.userlogout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are Logout Now!");
    res.redirect("/listings");
  });
};
