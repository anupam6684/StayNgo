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

//show profile
module.exports.profile = (req, res) => {
  let currUser = req.user;
  let originalImageUrl = currUser.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/ar_1.0,c_thumb,g_face,w_0.7/r_max/co_skyblue,e_outline/co_lightgray,e_shadow,x_5,y_8"
  );
  res.render("user/profile.ejs", { currUser, originalImageUrl });
};

//profile edit-form

module.exports.profileEditForm = (req, res) => {
  let crrUser = req.user;
  let originalImageUrl = crrUser.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/ar_1.0,c_thumb,g_face,w_0.7/r_max/co_skyblue,e_outline/co_lightgray,e_shadow,x_5,y_8"
  );
  res.render("user/editprofile.ejs", { crrUser, originalImageUrl });
};

//profile edit
module.exports.profileEdit = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      req.flash("error", "User not found!");
      return res.redirect("/user/profile");
    }

    // Update username & email
    user.username = username;
    user.email = email;

    // Handle profile photo upload (from multer)
    if (req.file) {
      user.image = {
        url: req.file.path, // path to uploaded file
        filename: req.file.filename,
      };
    }

    await user.save();

    // Refresh session to keep user logged in
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        req.flash("error", "Something went wrong with session update.");
        return res.redirect("/user/profile");
      }
      req.flash("success", "Profile updated successfully!");
      res.redirect("/user/profile");
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong, please try again.");
    res.redirect("/user/profile/edit");
  }
};

//user change password -form
module.exports.ChangePasswordForm = (req, res) => {
  res.render("user/password.ejs");
};
// Change Password

module.exports.ChangePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // passport-local-mongoose change password
    await req.user.changePassword(oldPassword, newPassword);

    // refresh login session so user stays logged in
    req.login(req.user, (err) => {
      if (err) {
        console.error(err);
        req.flash(
          "error",
          "Password changed but session refresh failed. Please log in again."
        );
        return res.redirect("/login");
      }

      req.flash("success", "Password updated successfully!");
      res.redirect("/user/profile");
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Invalid old password or something went wrong.");
    res.redirect("/user/profile/password");
  }
};
