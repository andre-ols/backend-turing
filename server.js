const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const routes = require('./routes');
const middlewareToken = require("./middleware/token")

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('conectado', (data) => {
    console.log(data)
    console.log(socket.id)
  }
    )
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) =>{
  req.io = io;

  next();
})

app.use('/dashboard', middlewareToken);

app.use(routes);


app.get("/", function(request, response) {
  response.json({ststus: 'online'});
});

 
server.listen(3333);
