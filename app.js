const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];
let workItems = [];

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

  let today = new Date();

  //formatting the date string
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);

  // use res.render to load up an ejs view file
  // rendering a file called list inside views folder with extension ejs and giving a value day to the letiable kindofDay
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  let item = req.body.newItem;

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
