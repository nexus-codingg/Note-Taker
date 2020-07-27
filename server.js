// Dependencies
// =================================
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const path = require("path");


// Sets up the Express Server
// =================================
const app = express();
const PORT = process.env.PORT || 5500;

// allows for Express to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// to access static files such as css and JS
app.use(express.static(path.join(__dirname, "public")));


// Routes
// routes to these files to gain access to the functions needed 
// to render the infomation for the HTML pages/API information
// ===============================
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, "0.0.0.0", (err) => {
    if (err) throw err 
    else console.log(`Server listening on: http://localhost:${PORT}`)
});