var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var port       = process.env.PORT || 4004;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/html/assets'));
require('./route/routes.js')(app);
require('./route/sockets.js')(io);
http.listen(port);

app.get('/',function(req,res){
  res.sendFile(__dirname + '/html/views/index.html');
});
console.log('The App Taxi Booking runs at port: ' + port);
