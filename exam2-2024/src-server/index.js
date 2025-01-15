const express = require('express');
const cors = require('cors');
const psList = require('ps-list');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const bodyParser = require('body-parser');
const internal = require('stream');

let polling = [];
let interval;

io.on('connection', function (socket) {
  console.log('a user connected');
  setTimeout(() => io.send('sample message'), 1000);


  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('start-polling', function (msg) {
    console.log('start-polling', msg);
    polling.push(msg);
    interval = setInterval(() => checkProcess(),1000);
  });
  socket.on('stop-polling', function () {
    console.log('stop-polling');
    polling = [];
    clearInterval(interval);
  });

  async function checkProcess() {
    const data = await psList();
    //console.log(data);
    let result = "pid:";
    for(d in data){
        if(data[d].pid in polling){
            console.log("It's in array")
            socket.emit('message', result.concat(data[d].pid," cpu:",data[d].cpu, " memory:",data[d].memory));
        };
    };
    console.log("done searching");
  };
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 8082;
server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});