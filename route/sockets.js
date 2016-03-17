module.exports = function(io){
  io.on('connection',function(socket){
    console.log('one user connected ' + socket.id);
    socket.on('gps',function(data){
      var sockets = io.sockets.sockets;
      console.log('data ' + data.latitude + ' ' + data.longitude);
      sockets.forEach(function(sock){
        if(sock.id != socket.id){
          sock.emit('gps',data);
        }
      });
    });
    socket.on('disconnect',function(){
      console.log('one user disconnected ' + socket.id);
    })
  });
}
