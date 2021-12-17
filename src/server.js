require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

// set up port
const connUri = `${process.env.MONGO_SCHEME}://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/${process.env.MONGO_DB}`;
console.log("MongoDB connUri:", connUri);
const port = process.env.PORT || 3000;

// === 1 - CREATE APP
// creating express app and configuring middleware needed for authentication
const app = express();

app.locals.settings["x-powered-by"] = false;

app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false })); // form-urlencoded

// serve the static files from the client - "client" is a link to the frontend site
console.log("__direname:", __dirname);
app.use(express.static(path.join(__dirname, '../client/build')))

// handles any requests that does not match the routes below
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build"));
});


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
require("./middlewares/jwt")(passport);

// === 4 - CONFIGURE ROUTES
// configure route
require("./routes/index")(app);

// === 5 - START SERVER
app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
