//LOAD DATA
const fs = require("fs");

const path = require('path');
const uniqid = require('uniqid');

module.exports = (app) => {
    // => API GET requests
    app.get('/api/notes', (req, res) => {
        console.log(__dirname);
        console.log('++++++++++++++++s')
        fs.readFile("../Develop/public/db/db.json/", "utf8", (err,data) => {
            if (err) {
                throw err;
            }
            return res.json(JSON.parse(data));
        });
    });

    //API POST requests
    app.post('/api/notes', (req, res) => {
        const note = req.body;
        note.id = uniqid();
        const database = JSON.parse(fs.readFileSync("./Develop/public/db/db.json/"));
        database.push(note);
        fs.writeFileSync('./Develop/public/db/db.json', JSON.stringify(database));
        res.json ("your note has been saved")
    });

    app.delete('/api/notes/:id', (req, res) => {
        const deleId = req.params.id;
        const dataToDele = JSON.parse(fs.readFileSync("./Develop/public/db/db.json/"));
        let filtered = dataToDele.filter(function (el) {
            return el.id != deleId;
        });
        fs.writeFileSync('./Develop/public/db/db.json', JSON.stringify(filtered));
        res.json ("your note has been deleted")
    })

}
