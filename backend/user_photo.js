const express = require('express');
const router = express.Router();
const multer = require('multer');
const dir = '../src/images/users-photo';
const fs = require('fs');
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const path = require('path');

const Jimp = require("jimp");

let userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.jpg');
  }
});

let uploadNew = multer({ storage: userStorage  }).single('userimage');

router.post('/', (req,res)=>{
  console.log(`User's photo POST IN:`);
  uploadNew(req,res, (err)=>{
    if(err){
      console.log(`error: ${err}`);
      return res.sendStatus(400);
    }
    let imagePath = req.file.path;
    Jimp.read(imagePath).then(image=>{
      image.quality(80).write(imagePath);
    }).catch(err=>console.log(`Err: ${err}`));
    res.send(req.file.filename);
  })
})

router.post('/remove', jsonParser, (req,res)=>{
  if(!req.body.file) return res.status(404);
  console.log('Remove in');
  console.log(req.body.file);
  let image = req.body.file;
  fs.unlink(`${dir}/${image}`, (err)=>{
    if(err) return res.status(400).send("Something not OK...");
    console.log('file was removed');
    res.status(200).send('File was removed');
  });
});

module.exports = router;