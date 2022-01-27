const express = require("express");
//const session = require("express-session"); // TODO: uninstall me
const session = require("cookie-session");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const errorHandler = require("./middlewares/error-handler");
// const cookieSession = require("cookie-session");
// const cookieParser = require("cookie-parser");
const User = require("./models/user");



// use environment configuration
if (process.env.NODE_ENV !== "production") { // load environment variables from .env file in non production environments
  require('dotenv').config({ path: path.resolve(__dirname, "../.env") })
}

// set up database connection uri
const connUri = (true || process.env.NODE_ENV !== "production") ?
  process.env.MONGO_LOCAL_CONN_URL :
  `${process.env.MONGO_SCHEME}://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/${process.env.MONGO_DB}`
;
console.log("MongoDB connUri:", connUri);

// set up port
const port = process.env.PORT || 3000;

// creating express app and configuring middleware needed for authentication
const app = express();

// // set up cookies
// app.use(
//   cookieSession({
//     name: "session",
//     keys: [ process.env.COOKIE_SECRET ],
//     maxAge: 24 * 60 * 60 * 1000, // TODO: put in config or .env
//   })
// );
// app.use(cookieParser());

// use the logger for the development environment
app.use(logger("dev"));

// disable too blabbing headers
app.disable("x-powered-by");

// enable application/json parsing
app.use(express.json());

// enable parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// enable cors
//app.use(cors({ origin: "*" }));
const whitelist = process.env.WHITELISTED_DOMAINS ?
  process.env.WHITELISTED_DOMAINS.split(",") :
  []
;
const corsOptions = {
  origin: (origin, callback) => {
    console.log("/server.js - cors whitelisting:", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS")); // TODO: test this when on production...
    }
  },
  credentials: true,
}
app.use(cors(corsOptions));

// initialize database
mongoose.promise = global.Promise; // configure mongoose promise to global promise
mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB database connection established successfully"));
connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
  process.exit();
});

// use session to serialize session auth data
app.use(session({
  secret: "secret", // TODO: in config
  resave: false ,
  saveUninitialized: true,
}));

// // setup passport middleware
// app.use(passport.initialize()); // initialize passport
// app.use(passport.session()); // allow passport to deserialize cookies from the browser0

// configure passport middleware
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // allow passport to deserialize cookies from the browser
passport.serializeUser((user, done) => { // serialize user
console.log("/server.js - serialized user:", user);
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
console.log("/server.js - deserialized user id:", userId);
  User.findById(userId, (err, user) => {
    done(err, user);
  });
  //done(null, user);
});
//require("./middlewares/passport")(app, passport);
//require("./middlewares/user-serialize")(passport);
//require("./middlewares/user-deserialize")(passport);
require("./middlewares/strategies/jwt-local")(passport);
require("./middlewares/strategies/oauth2-google")(passport);

// configure routes
require("./routes")(app);

// serve the static files from the client - "client" is a link to the frontend site
const root = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(root));

// handles any requests that does not match the routes below (all routes handled by client)
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
})

// global error handler
app.use(errorHandler);

// start express server
app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
