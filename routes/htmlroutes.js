// Dependencies
// The path npm package is needed to get the correct file paths for the html pages
var path = require("path");

// Routes
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};