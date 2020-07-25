// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let fs = require("fs");

// Sets up the Express App
// =============================================================
let app = express();
const PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// to access static files such as css and JS
app.use(express.static(path.join(__dirname, 'public')));




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });