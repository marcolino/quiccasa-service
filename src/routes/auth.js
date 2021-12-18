const express = require("express");
const {check} = require("express-validator");

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

router.post("/login", [
  check("email").isEmail().withMessage("Enter a valid email address"),
  check("password").not().isEmpty(),
], validate, Auth.login);

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
  check("password").not().isEmpty().isLength({min: 6}).withMessage("Must be at least 6 chars long"),
  check("confirmPassword", "Passwords do not match").custom((value, {req}) => (value === req.body.password)),
], validate, Password.resetPassword);


module.exports = router;