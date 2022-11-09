//
const express = require("express");
const app = express();
// const mysql = require('mysql')
const pool = require("./db/db");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

pool.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});


app.use('/uploads',express.static('./public/images'))




//@type   POST
//route for post data
app.post("/upload", upload.single("file"), async (req, res) => {
console.log("name",req.body.body)

// console.log("num",req.body.body.num)

  res.send({ mess: "uploaded Sucessfully" });
  if (!req.file) {
    console.log("No file upload");
    res.status.send({ err: "no file uploaded" });
  } else {
    try {
      const imageUploader = await pool.query(
        "insert into imageUpload (name,image) values($1,$2)",
        [req.body.body.name,req.file]
      );
      console.log("image uploaded sucessfully");
    } catch (error) {
      console.log(error);
    }
  }
});

// get images

app.get("/getImages",async (req, res) => {
  const getImages =await pool.query(`select * from imageUpload `);
  res.send(getImages.rows)
});



// DELETE

app.delete('/dlt/:id',async(req,res)=>{
    const {id}=req.params
    const dltUser=await pool.query(`delete from imageUpload where id=${id} `)
    res.send("'deleted sucessfully")
})

//create connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
