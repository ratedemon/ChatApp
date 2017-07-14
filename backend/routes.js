const express = require('express');
const router = express.Router();
const multer = require('multer');
const dir = '../src/images/avatars/';

const Jimp = require("jimp");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.jpg');
  }
});

let upload = multer({ storage: storage }).single('avatar');

router.post('/source', function (req, res) {
  console.log("POST IN :" );
  upload(req, res, function (err) {
    if (err) {
      console.log("error:" + err);
      return res.sendStatus(400);
    }
    let imagePath = req.file.path;
    Jimp.read(imagePath).then(image=>{
      image.quality(80).write(imagePath);
    }).catch(err=>console.log(`Err: ${err}`));
    res.send(req.file.filename);
  });
});


module.exports = router;
