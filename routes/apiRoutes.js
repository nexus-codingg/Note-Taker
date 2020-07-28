// Dependencies
// =================================
const apiRouter = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


// when using "/api/notes" was getting a 404 error of cannot GET /api/nots 
// changed to just "/notes" working as expected
apiRouter.get("/notes", (req, res) => {
    // this will read the information stored in the db,json and return the data
        console.log("successful GET of notes stored in db.json")
        res.json(getNotes());
    
});

function getNotes() {
    return JSON.parse(fs.readFileSync("./db/db.json"));  
}

apiRouter.post("/notes", (req, res) => {
    let notesArr = getNotes();
    let note = req.body;
    console.log(note);
    // uses uuid to add a random id to each note's data
    note.id = uuidv4() + 1;
    // adds the array that stores all the note data
    notesArr.push(note);
    //saves and updates the new notes array
    fs.writeFileSync("./db/db.json", JSON.stringify(notesArr), "utf8")
        res.json(note);
    });


module.exports = apiRouter;