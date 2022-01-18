const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

if (process.env.NODE_ENV !== "production") { // load environment variables from .env file in non production environments
  require('dotenv').config({ path: path.resolve(__dirname, "../.env") })
}

// set up port
const connUri = `${process.env.MONGO_SCHEME}://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/${process.env.MONGO_DB}`;
console.log("MongoDB connUri:", connUri);
const port = process.env.PORT || 3000;

// === 1 - CREATE APP
// creating express app and configuring middleware needed for authentication
const app = express();

app.use(logger('dev'));

//app.locals.settings["x-powered-by"] = false;
app.disable("x-powered-by");

app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false })); // form-urlencoded

// TODO: handle CORS white-listing
// const whitelist = process.env.WHITELISTED_DOMAINS
//   ? process.env.WHITELISTED_DOMAINS.split(",")
//   : []
// ;
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }

// app.use(function(req, res, next) {
//   //next(err);
//   res.status(404).json(error("Not found"));
// });
//// view engine setup
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "jade");

// === 2 - SET UP DATABASE
// configure mongoose promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB database connection established successfully"));
connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
  process.exit();
});

// === 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
//require("./middlewares/jwt")(passport);
require("./middlewares/strategies/jwt-local")(passport);

require("./middlewares/strategies/oauth2-google")(passport);

// === 4 - CONFIGURE ROUTES
// configure routes
require("./routes/index")(app);

// // serve the static files from the client - "client" is a link to the frontend site
//console.log("__dirname:", __dirname);
// app.use(express.static(path.join(__dirname, '/../client/build/index.html')))

// // handles any requests that does not match the routes below
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../client/build/index.html"));
// });

const root = path.join(__dirname, '..', 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile('index.html', { root });
})

// === 5 - START SERVER
app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));