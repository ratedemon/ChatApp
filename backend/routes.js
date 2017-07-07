const express = require('express');
// const app = express();
const router = express.Router();
const multer = require('multer');
const dir = 'images/';
// const upload = multer({ dest: dir })

// router.post('/', upload.single('avatar'), (req,res,next)=>{
//   res.send(req.file);
//   console.log(req.file);
// })

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    console.log(file, cb, req);
    cb(null, file.fieldname + '-' + Date.now()+ '.jpg');
  }
})

let upload = multer({ storage: storage }).single('profileImage');

router.post('/source', function (req, res) {
  console.log("POST IN :" );
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      // return
      console.log(err);
      return res.sendStatus(400);
    }
    console.log(req.body, req.files, req.file);
    // res.json({
    //   success: 200,
    //   message: "All is good"
    // })
    // res.send(req.files);
    // Everything went fine
  })
})
// router.post('/source', upload, (req,res,next)=>{
//   console.log(req.body, req.file);
// })

module.exports = router;
