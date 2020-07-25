// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require("path");
const htmlRouter = require("express").Router();

// to export the var app = express(); 
require("../app");


  // In each of the below cases the user is shown an HTML page of content
  // path is releative to the file your in
  htmlRouter.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // If no matching route is found default to index
  htmlRouter.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  module.exports = htmlRouter