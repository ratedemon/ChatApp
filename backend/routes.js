const express = require('express');
// const app = express();
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/chatapp";

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/messages', (req,res)=>{
  res.send('asdasdads');
});

module.exports = router;

// module.exports = function(app,io){
//   const express = require('express');
//   const router = express.Router();
//   const mongoClient = require('mongodb').MongoClient;
//   const bodyParser = require('body-parser');
//   const objectId = require("mongodb").ObjectID;
//   const url = "mongodb://localhost:27017/chatapp";
//   const jsonParser = bodyParser.json();

//   router.get('/messages', (req,res)=>{
//     let array = [];
//     mongoClient.connect(url, (err,db)=>{
//     if(err) return res.sendStatus(400);
//     db.collection('message').find({}).toArray((err,mess)=>{
//       if(err) return res.sendStatus(400);
//       io.sockets.emit('message', array);      
//       // res.send(mess);
//       console.log(mess);
//       res.status(200).json(mess);
//       array = mess;
//       db.close();
//     });
//   });
//   });

//   router.post('/messages', jsonParser, (req,res)=>{
//   if(!req.body) return res.sendStatus(400);
//   console.log(req.body);
//   let message = {name: req.body.name, message: req.body.message, photoURL: req.body.photoURL};
//   mongoClient.connect(url, (err,db)=>{
//     db.collection('message').insertOne(message, (err,result)=>{
//       if(err) return res.sendStatus(400);
//       res.send(message);
//       console.log('POST DATA');
//       db.close();
//       })
//     })
//   });
//   return router;
// }