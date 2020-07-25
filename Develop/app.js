// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let htmlRoutes = require("./routes/htmlRoutes");
let apiRoutes = require("./routes/apiRoutes");

// Sets up the Express App
// =============================================================
let app = express();
const PORT = process.env.PORT || 5500;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// to access static files such as css and JS
app.use(express.static('public'));

// to get acess to the functions needed to render the infomation for these pages 
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);



// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));

