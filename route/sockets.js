module.exports = function(io){
  var gpsData = {};
  io.on('connection',function(socket){
    console.log('one user connected ' + socket.id);
    gpsData[socket.id] = {socket: socket};

    socket.on('gps',function(data){
      gpsData[socket.id].data = data;
      var sockets = io.sockets.sockets;
      var paquet = { 'token':data.token, 'socket':socket.id, 'latitude':data.latitude, 'longitude':data.longitude, 'working':data.working };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('gps',paquet);
        }
      });
    });

    socket.on('reclamation',function(data){
      var sockets = io.sockets.sockets;
      var paquet = { 'token':data.token, 'socket':socket.id, 'latitude':data.latitude, 'longitude':data.longitude, 'working':data.working };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('gps',paquet);
        }
      });
    });

    socket.on('disconnect',function(){
      console.log('one user disconnected ' + socket.id);

      var sockets = io.sockets.sockets;
      var paquet = { 'socket':socket.id, 'working':false };
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('gps',paquet);
        }
      });
      delete gpsData[socket.id];
    })
  });
}
