const express = require("express");
const bodyParser = require("body-parser");

// requiring a module that is saved locally
const date = require(__dirname + "/date.js");

const app = express();

// declaring arrays as const
const items = [];
const workItems = [];

// set the view engine to ejs
app.set("view engine", "ejs");

// bodyParser module needs to be set to use req.body
app.use(bodyParser.urlencoded({
  extended: true
}));

// access static files
app.use(express.static("public"));

// index page
app.get("/", function(req, res) {

  // inputting date.js module here
  const day = date.getDate();

  // use res.render to load up an ejs view file
  // rendering a file called list inside views folder with extension ejs and giving a value day to the constiable kindofDay
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
