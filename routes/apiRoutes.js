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
    // console nogs the note created and pushed to db.json
    console.log(note);
    // uses uuid to add a random id to each note's data, but also removes dashes
    let randomID = uuidv4();
    let formatedID = randomID.replace(/[-\s]/g,"");
    note.id = formatedID + 1;
    // adds the array that stores all the note data
    notesArr.push(note);
    //saves and updates the new notes array
    fs.writeFileSync("./db/db.json", JSON.stringify(notesArr), "utf8");
    console.log("Your note has been successfully created");
    return res.json(note);
});


// delete the note by uuid
apiRouter.delete("/notes/:id", (req, res) => {
    let deleteNote = req.params.id;
    // // this is the id of the note selected
    // console.log(deleteNote);
    let getSelectedNote = getNotes();
    
    // will loop through all the notes to find the selected id created by uuid
    for(let i = 0; i < getSelectedNote.length; i++){
        if(parseInt(getSelectedNote[i].id) == deleteNote){
          //Splices the selected note 
          getSelectedNote.splice(i, 1);
          //Saves the new notes array (w/o the deleted note) to update the db.json file
          fs.writeFileSync("db/db.json", JSON.stringify(getSelectedNote));
          
        } 
      }
      console.log("Your note has been successfully deleted!");
      return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
})




module.exports = apiRouter;