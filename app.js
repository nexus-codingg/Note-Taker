// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let fs = require("fs");
let dbJSON = require("./Develop/db/db.json");

// Sets up the Express App
// =============================================================
let app = express();
const PORT = process.env.PORT || 5500;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// to access static files such as css and JS
app.use(express.static('public'));


// HTML Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));  
});


// recieve information from user 
function handleNewNotes (req, res){
    req.on("data", function(data) {
        let newNotes = [];
        newNotes += data;
        console.log("new notes have been added to the array");
    });
}


// API Calls
app.get("/api/notes", function(req, res) {
    let notesJSON = fs.readFileSync(dbJSON) || handleNewNotes();
    if(notesJSON){
      res.json(JSON.parse(notesJSON));
    }
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on http://127.0.0.1/" + PORT);
  });