const express = require("express");
const {check} = require("express-validator");
const passport = require("passport");
//const url = require("url");
const Auth = require("../controllers/auth");
const Password = require("../controllers/password");
const validate = require("../middlewares/validate");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to the Quiccasa auth API" }); // TODO: quiccasa should be a variable
  //next();
});

router.post("/register", [
  check("email").isEmail().withMessage("Enter a valid email address"),
  check("password").not().isEmpty().isLength({min: 6}).withMessage("Must be at least 6 chars long"),
  check("firstName").not().isEmpty().withMessage("You first name is required"),
  check("lastName").not().isEmpty().withMessage("You last name is required")
], validate, Auth.register);

// registration confirmation verification
router.get("/verify/:token", Auth.verify);
// token resend
router.post("/resend", Auth.resendToken);

// password recover
router.post("/recover", [
  check("email").isEmail().withMessage("Enter a valid email address"),
], validate, Password.recover);

router.get("/reset/:token", Password.reset);

router.post("/reset/:token", [
  check("password").not().isEmpty().isLength({min: 6}).withMessage("Password must be at least 6 chars long"),
  check("confirmPassword", "Passwords do not match").custom((value, {req}) => (value === req.body.password)),
], validate, Password.resetPassword);

router.post("/login", (req, res, next) => {console.log("*** login"); next();}, [
  check("email").isEmail().withMessage("Enter a valid email address"),
  check("password").not().isEmpty(),
], validate, Auth.login);

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get("/loginGoogle", passport.authenticate("google",
  //{ scope: [ "email", "profile" ] }
  { scope: [ "email", "profile" ],
  accessType: 'offline', approvalPrompt: 'force' } // to get refresh token too
), Auth.loginGoogle);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

//router.get("/loginGoogle/callback", passport.authenticate("google", { successRedirect: "/", failureRedirect: "/login" }));

router.get("/loginGoogleCallback", passport.authenticate("google", { session: false }), /*(req, res) => {
  // if this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
console.log("req.user:", req.user);
  //res.cookie("auth", { user: req.user }, { httpOnly: false }); // save user in a cookie; it should be read by client
  res.redirect("/");
},*/
  Auth.loginGoogleCallback
);

router.get("/logout", (req, res) => { // TODO: test this really works
  req.logout();
  res.redirect("/");
});

// router.get("/currentAuthenticatedUser", function(req, res) {
//   console.log("currentAuthenticatedUser:", req.user, req.isAuthenticated());
//   //res.status(200).json(req.isAuthenticated());
//   res.status(200).json(req.user ? req.user : false);
// });

module.exports = router;