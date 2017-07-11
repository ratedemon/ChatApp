const express = require('express');
const router = express.Router();
const multer = require('multer');
const dir = '../src/images/users-photo';


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
  // console.log(req);
  uploadNew(req,res, (err)=>{
    if(err){
      console.log(`error: ${err}`);
      return res.sendStatus(400);
    }
    // console.log(req.file);
    res.send(req.file.filename);
  })
})

module.exports = router;