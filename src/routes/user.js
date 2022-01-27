const express = require("express");
const {check} = require("express-validator");
const multer = require("multer");

const User = require("../controllers/user");
const validate = require("../middlewares/validate");
const allowRoles = require("../middlewares/allowRoles");

const router = express.Router();

const upload = multer().single("profileImage");

// get all users
router.get("/", allowRoles("admin"), User.getAll);

// save user
router.post("/", [
  check("email").isEmail().withMessage("Enter a valid email address"),
  check("username").not().isEmpty().withMessage("You username is required"),
  check("firstName").not().isEmpty().withMessage("You first name is required"),
  check("lastName").not().isEmpty().withMessage("You last name is required")
], validate, User.store);

// get user
router.get("/:id", User.get);

// update user
router.put("/:id", upload, User.update);

// delete user
router.delete("/:id", User.delete);

module.exports = router;
