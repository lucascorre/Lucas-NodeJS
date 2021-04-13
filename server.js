const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

let Message = mongoose.model('Message',{
  pseudo : String,
  message : String
})

let dbUrl = 'mongodb://localhost:27017'

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  let message = new Message(req.body);
  console.log(req.body.pseudo + ': ' + req.body.message);
  message.save((err) =>{
    console.log(err)
    if(err) {
      res.sendStatus(500);
    }
    else {
        io.emit('message', req.body);
        res.sendStatus(200);
    }
  })
})

io.on('connection', () =>{
  console.log('a user is connected')
})

mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;
/*
const db = instance.db('ChatNodeJS');
const collection = db.collection('Chat');
*/
db.on('error', err => console.error(err));
db.once('open', () => {
    console.log('ca marche');
})

let server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});

app.use(express.static(__dirname + "/public"));