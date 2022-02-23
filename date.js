// creating a module for date.js to carry out the code

// creating and exporting a function to main app.js

exports.getDate = function () {
  const today = new Date();

  //formatting the date string
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return day = today.toLocaleDateString("en-US", options);
}

// creating another function to export

exports.getDay = function() {
  const today = new Date();

  //formatting the date string
  const options = {
    weekday: "long",
  };
  return day = today.toLocaleDateString("en-US", options);
}
