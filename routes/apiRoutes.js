// Dependencies
// =================================
const apiRouter = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


// when using "/api/notes" was getting a 404 error of cannot GET /api/nots 
// changed to just "/notes" working as expected
apiRouter.get("/notes", (req, res) => {
    // this will read the information stored in the db,json and return the data
    // console.log("successful GET of notes stored in db.json")
    res.json(getNotes());

});

// re-useable function to read json file
function getNotes() {
    return JSON.parse(fs.readFileSync("./db/db.json"));
}

apiRouter.post("/notes", (req, res) => {
    let notesArr = getNotes();
    let note = req.body;
    // console logs the note created and pushed to db.json
    // console.log(note);
    // uses uuid to add a random id to each note's data, but also removes dashes
    let randomID = uuidv4();
    let formatedID = randomID.replace(/[-\s]/g,"");
    note.id = formatedID + 1;
    // adds the array that stores all the note data
    notesArr.push(note);
    //saves and updates the new notes array
    fs.writeFileSync("./db/db.json", JSON.stringify(notesArr), "utf8");
    return res.json(note).send(console.log(`Your note has been successfully created: ${note.title}`));
    
});


// delete the note by uuid
apiRouter.delete('/notes/:id', function (req, res) {
    let deletedNote = req.body.title;
    console.log(`the note to be deleted is: ${deletedNote}`);

    fs.readFile('./db/db.json', "utf8", function (err, data) {
        if (err) throw err;
        let noteData = JSON.parse(data)

        // use filter, to remove the object with id = req.params.id, create a new array
        let noteDataRemain = noteData.filter(obj => (obj.id !== req.params.id));
        // Copy the content of this reduced array, to the current array 
        notesArray = noteDataRemain;

        // save it back to db.json
        // before write to a file, convert object into JSON Text 
        let notesArrayText = JSON.stringify(noteDataRemain);

        fs.writeFile('./db/db.json', notesArrayText, function (err, data) {
            if (err) throw err;
            console.log("Your note has been deleted sucessfully!");
            return res.json(true);
        })
    })

})




module.exports = apiRouter;