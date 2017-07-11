const express = require('express');
const app = express();
const api = require('./routes');
const photos = require('./user_photo');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(5000);
const mongoClient = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectID;
// const url = "mongodb://localhost:27017/chatapp";
const admin = require('./system.info');

const url = `mongodb://${admin.login}:${admin.password}@ds151452.mlab.com:51452/chatapp`

app.use(express.static(__dirname + '/dist'));

let messages = [];
let online = 0;

io.on('connection', (socket)=>{
  console.log('client connected', online);
  ++online;
  io.sockets.emit('onlineNow', online);
  mongoClient.connect(url, (err,db)=>{
    let stream = db.collection('message').find({}).sort({_id:-1}).limit(30).toArray((err,result)=>{
      // console.log(result);
      messages = result;
      socket.emit('chat', messages);
    })
  });
  socket.on('disconnect',()=>{
    --online;
    io.sockets.emit('onlineNow', online);
    console.log('client disconnect', online);
  });
  socket.broadcast.emit('writing', true);
  socket.on('messaging', (msg)=>{
    console.log(msg);
    mongoClient.connect(url, (err,db)=>{
      let stream = db.collection('message').insert({message: msg.message, name: msg.name, photoURL: msg.photoURL, image: msg.image}, (err, result)=>{
        if(err){console.log(err.message)}
        else{
          console.log('chat message inserted into db:' + msg);
        }
      })
    });
    // socket.broadcast.emit('chat', msg);
    // socket.broadcast.send(msg);
    // socket.json.send(msg);
    messages.unshift(msg);
    io.sockets.emit('messageToClient', messages);
  });
  socket.on('pagination', (count)=>{
    console.log(count);
    mongoClient.connect(url, (err,db)=>{
      db.collection('message').find({}).sort({_id:-1}).limit(count*30).toArray((err,result)=>{
          messages = result;
          socket.emit('chat', messages);
      })
    })
  })
})

// app.post('/source', upload.single('avatar'), (req,res,next)=>{
//   console.log("IN POST");
//   console.log(req.file, req);
// });

app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/user-source', photos);
app.use('/', api);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

module.exports = app;