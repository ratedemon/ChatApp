const express = require('express');
const app = express();
const api = require('./routes');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(5000);
const mongoClient = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/chatapp";

let messages = [];

io.on('connection', (socket)=>{
  console.log('client connected');
  
  mongoClient.connect(url, (err,db)=>{
    let stream = db.collection('message').find({}).sort({_id:-1}).limit(30).toArray((err,result)=>{
      // console.log(result);
      messages = result;
      socket.emit('chat', result);
    })
  });
  socket.on('disconnect',()=>{
    console.log('client disconnect');
  });
  socket.on('messaging', (msg)=>{
    console.log(msg);
    mongoClient.connect(url, (err,db)=>{
      let stream = db.collection('message').insert({message: msg.message, name: msg.name, photoURL: msg.photoURL}, (err, result)=>{
        if(err){console.log(err.message)}
        else{
          console.log('chat message inserted into db:' + msg);
        }
      })
    });
    // socket.broadcast.emit('chat', msg);
    // socket.broadcast.send(msg);
    // socket.json.send(msg);
    messages.push(msg);
    io.sockets.emit('messageToClient', messages);
  });
  socket.on('pagination', (count)=>{
    console.log(count);
    mongoClient.connect(url, (err,db)=>{
      db.collection('message').find({}).sort({_id:-1}).limit(count*30).toArray((err,result)=>{
        if(messages.length == result.length){

        }else{
          messages = result;
          socket.emit('chat', result);
        }
      })
    })
  })
})

// app.use('/', api);
 
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = app;