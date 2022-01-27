//const GoogleStrategy = require("passport-google-oauth2").Strategy; // TODO: remove me

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../../models/user");

const opts = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/loginGoogleCallback",
  passReqToCallback: true
};
console.log("OPT:", opt);

module.exports = passport => {
  passport.use(
    new GoogleStrategy(opts, async(request, accessToken, refreshToken, profile, done) => {
console.log("PASSPORT GOOGLE STRATEGY OK - profile:", profile);
console.log("PASSPORT GOOGLE STRATEGY OK - accessToken:", accessToken);
console.log("PASSPORT GOOGLE STRATEGY OK - refreshToken:", refreshToken);

      // enforce profile.email to be present!
      if (!profile.email) {
console.error("Empty profile email from Google oauth2");
        return done(new Error("Empty profile email from Google oauth2"), null);
      }

      // get the user data from google 
      const newUser = {
        googleId: profile.id,
        //displayName: profile.displayName,
        firstName: profile.given_name,
        lastName: profile.family_name,
        profileImage: profile.picture,
        email: profile.email,
        isVerified: profile.verified,
        password: "none", // no password, it's a socially authorized user
        accessToken,
        refreshToken,
      }

      try {
        //find the user in our database 
        let user = await User.findOne({ email: newUser.email /*googleId: profile.id*/ })

        if (user) { // user present in our database
console.log("FOUND EXISTING USER:", user);
          done(null, user);
        } else { // user is not preset in our database
console.log("CREATING NEW USER");
          try {
            user = await User.create(newUser);
            done(null, user);
          } catch (err) {
            console.error(err);
            done(err, null);
          }
        }
      } catch (err) {
        console.error(err);
        done(err, null);
      }
console.log("=================================");
      //return done(null, profile);
    }
//     (request, accessToken, refreshToken, profile, done) => {
// console.log("authUser", profile);
//       return done(null, profile);
//     }
  ));
};