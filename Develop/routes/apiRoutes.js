const apiRouter = require("express").Router();
const db = require("../db/db.json") // temporary memory of the information inside the 
const fs = require("fs");

// Return all saved notes in the db file.
apiRouter.get("/notes", (req, res) => {
    res.json(db)
})


module.exports = apiRouter