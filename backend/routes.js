const express = require('express');
const router = express.Router();
const multer = require('multer');
const dir = '../src/images/';

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
      // An error occurred when uploading
      // return
      console.log("error:" + err);
      return res.sendStatus(400);
    }
    // res.send('All is good');
    console.log(req.file.filename);
    res.send(req.file.filename);
  });
});


module.exports = router;
