const passport = require("passport");

module.exports = (req, res, next) => {
console.log("passport.authenticate"); 
  passport.authenticate("jwt", function(err, user, info) {
//console.log("ERR:", err);
//console.log("INFO:", info);

    if (err) return res.status(401).json({ message: err.message, reason: err.reason ? err.reason : null }); // TODO: can this happen?
    if (!user) return res.status(401).json({ message: "Unauthorized", reason: "No Token Provided" });
    // TODO if (!user.token)) ???

    req.user = user;

    next();

  })(req, res, next);
};

// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const dev = process.env.NODE_ENV !== "production";

// exports.COOKIE_OPTIONS = {
//   httpOnly: true,
//   secure: !dev, // since localhost is not having https protocol, secure cookies do not work correctly (in postman)
//   signed: true,
//   maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRY, // TODO: milliseconds???
//   sameSite: "none",
// }

// exports.getToken = user => {
//   const accessToken =  jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, {
//   expiresIn: eval(process.env.JWT_ACCESS_TOKEN_EXPIRY),
//   });
//   return accessToken;
// }

// exports.getRefreshToken = user => {
//   const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
//   expiresIn: eval(process.env.JWT_REFRESH_TOKEN_EXPIRY),
//   })
//   return refreshToken;
// }

// exports.verifyUser = passport.authenticate("jwt", { session: false });