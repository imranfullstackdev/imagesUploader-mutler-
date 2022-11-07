const express = require("express");
const router = express.Router();
const multer = require('multer')
const pool=require('../db/db')
const path = require('path')
const cors = require("cors");
const bodyParser = require('body-parser');


var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')       // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});



// route
router.post("/upload", upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log("first")
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
        db.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
});



module.exports = router;
