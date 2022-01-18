const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../../models/user");

const opts = {
  clientID: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: "https://quiccasa.herokuapp.com/api/auth/loginGoogle/callback",
  passReqToCallback: true
};

module.exports = passport => {
console.log("PASSPORT GOOGLE STRATEGY");
  passport.use(
    new GoogleStrategy(opts, (request, accessToken, refreshToken, profile, done) => {
console.log("PASSPORT GOOGLE STRATEGY OK:", profile);
      User.findOrCreate({ googleId: profile.id })
        .then((err, user) => {
          if (user) return done(null, user);
          return done(err, false);
        })
        .catch(err => {
          return done(err, false, { message: "Server Error" });
        })
      ;
    })
  );
};