const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// bodyParser module needs to be set to use req.body
app.use(bodyParser.urlencoded({
  extended: true
}));

// access static files
app.use(express.static("public"));

// connecting to mongoose
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/todolistDB');
};

// creating a schema for one property
const itemsSchema = {
  name: String
};

//create a model
const Item = mongoose.model("item", itemsSchema) // creating a model needs to capitalised e.g. Item

// create multiple documents
const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit + button to add item"
});

const item3 = new Item({
  name: "Hit <-- this button to delete item"
});

const defaultItems = [item1, item2, item3]



// index page
app.get("/", function(req, res) {
  // find all items in database
  Item.find({}, function(err, item) {
    if (item.length === 0) {
      // insert documents into database
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Successfully added");
        }
      });
      res.redirect("/");
    } else {
      // use res.render to load up an ejs view file
      res.render("list", {
        listTitle: "Today",
        newListItems: item
      });
    }
  });
});

// posting to add items
app.post("/", function(req, res) {
  const newItem = req.body.newItem;

  const item = new Item({
    name: newItem
  });
  item.save();
  res.redirect("/");
});

// posting to delete items
app.post("/delete", function(req, res) {
  const checkedItemID = req.body.checkbox;
  // delete item from database based on the ID
  Item.findByIdAndRemove(checkedItemID, function(err) {
    if (!err) {
      console.log("Success");
    }
  });
  res.redirect("/");
});


// use express routing to create custom dynamic lists
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
