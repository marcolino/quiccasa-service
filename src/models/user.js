const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Token = require("../models/token");
//const { secondsUpToNextDays } = require("../utils");


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: "Your email is required",
    trim: true
  },

  username: {
    type: String,
    unique: true,
    required: false,
    index: true,
    sparse: true
  },

  password: {
    type: String,
    required: "Your password is required",
    max: 100
  },

  firstName: {
    type: String,
    required: "First Name is required",
    max: 100
  },

  lastName: {
    type: String,
    required: "Last Name is required",
    max: 100
  },

  roles: {
    type: [String],
    required: false
  },

  bio: {
    type: String,
    required: false,
    max: 255
  },

  profileImage: {
    type: String,
    required: false,
    max: 255
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  resetPasswordToken: {
    type: String,
    required: false
  },

  resetPasswordExpires: {
    type: Date,
    required: false
  },

  googleId: { // TODO: do we need this? possibly not, we use email as id for any user
    profileImage: {
      type: String,
      required: false,
      max: 255
    },
  },

  accessToken: {
    type: String,
    required: false,
    max: 512
  },

  refreshToken: {
    type: String,
    required: false,
    max: 512
  },

}, {timestamps: true});


UserSchema.pre("save",  function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
  // const today = new Date();
  // const expirationDate = new Date(today);
  // expirationDate.setDate(today.getDate() + 60);
  const accessTokenExpiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRY;
  const refreshTokenExpiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRY;

  let payload = {
    id: this._id,
    email: this.email,
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
  };

  console.warn("SIGNING JWT with accessTokenExpiresIn:", accessTokenExpiresIn);
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: accessTokenExpiresIn });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiresIn });
  return { accessToken, refreshToken };
};

UserSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + (3600 * 1000); // expires in an hour
};

UserSchema.methods.generateVerificationToken = function() {
  let payload = {
    userId: this._id,
    //token: crypto.randomBytes(20).toString("hex")
    token: Math.floor(Math.random(1000000) * 1000000),
  };

  return new Token(payload);
};

module.exports = mongoose.model("Users", UserSchema);