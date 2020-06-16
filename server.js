const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const routes = require('./routes');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use((req, res, next) =>{
  req.io = io;

  next();
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);


app.get("/", function(request, response) {
  response.json({ststus: 'online'});
});

 
server.listen(3333);
