const express = require("express");
const logger = require("morgan"); // helps log what requests are being made to the server
const path = require("path");

// initialize express app
const app = express();

// logs what path a user is on and what requests a user is making
// if someone makes a GET request, use this before AND after any requests
app.use(logger("dev"));

app.use(express.json()); // this allows express to parse JSON data

// when using static files, I want you to go to the public folder to serve it up
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// the "/" is the path, you choose what the path is.
app.get("/", function (req, res) {
  // response.render("index"); //serve me a file called "index". It will search the views directory for this
  res.render("index", {
    user: "John",
    info: ["naps", "traveling", "eat food"],
  });
});

app.get("/photo-fun", function (req, res) {
  res.render("photos");
});

app.get("/:pet/:age", function (req, res) {
  res.render("pets", { pet: req.params.pet, age: req.params.age });
  //res.json({ pet: req.params.pet, age: req.params.age });
});

// Port 3000
app.listen(3000, function () {
  console.log(`Server started running on PORT: ${3000}`);
});
