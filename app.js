var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var http         = require('http').Server(app);
var io           = require('socket.io')(http);
var port         = process.env.PORT || 4004;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/html/assets'));

app.use(session({ secret: 'azerty1234567890' }));
app.use(cookieParser());

require('./route/routes.js')(app);
require('./html/html.js')(app);
require('./route/sockets.js')(io);

http.listen(port);
console.log('The App Taxi Booking runs at port: ' + port);
