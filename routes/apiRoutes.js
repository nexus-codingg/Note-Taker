// Dependencies
// =================================
const apiRouter = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const dbInfo = require("../db/db.json");


// when using "/api/notes" was getting a 404 error of cannot GET /api/nots 
// changed to just "/notes" working as expected
apiRouter.get("/notes", (req, res) => {
    // this will read the information stored in the db,json and return the data
    fs.readFileSync("./db/db.json", "utf8", (err, data) => {
        if (err) {
            throw err
        }
        return res.json(JSON.parse(data));
    })
    res.send(console.log("successfully showing /api/notes information"));
});

apiRouter.post("/notes", (req, res) => {
    if (err) {
        throw err
    }
    let noteArr = JSON.parse(fs.readFileSync("../db/db.json"));
    let note = req.body;
    // uses uuid to add a random id to each note's data
    note.id = uuid.v4();
    // adds the array that stores all the note data
    noteArr.push(note);
    //saves and updates the new notes array
    fs.writeFileSync("db/db.json", JSON.stringify(notesArr), (err1) => {
        if (err) throw err
        else {
            res.send(console.log("Successfully added a new note and the json.db file has been updated."));
        }
    });

});


module.exports = apiRouter;